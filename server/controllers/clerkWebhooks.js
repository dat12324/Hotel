import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook received:", req.body);
        console.log("Headers:", req.headers);
        
        // Check if required headers are present
        const requiredHeaders = ["svix-id", "svix-timestamp", "svix-signature"];
        const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);
        
        if (missingHeaders.length > 0) {
            console.error("Missing required headers:", missingHeaders);
            return res.status(400).json({
                success: false, 
                message: "Missing required headers",
                missingHeaders: missingHeaders
            });
        }
        
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting Data from request body
        const {data, type} = req.body;

        const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        };

        console.log("Processing user data:", userData);

        // Switch Cases for different Events
        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData, {new: true});
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }        
            default:
                break;
        }
        res.json({success: true, message: "Webhook Received"});


    } catch (error) {
        console.error("Webhook error:", error.message);
        res.json({success: false, message: error.message});
    };  
};


export default clerkWebhooks;
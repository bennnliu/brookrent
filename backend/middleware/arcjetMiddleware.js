import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
const { ARCJET_KEY } = process.env;

const aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"]
    
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 10,
            interval: 5,
            capacity: 20,
        })
    ]
})

const ajDecision = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.writeHead(429, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Too Many Requests" }));
            } 
            else if (decision.reason.isBot()) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "No bots allowed" }));
            } 
            else {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Forbidden" }));
            }
        }
        next();
        
    } catch (error) {
        console.error("Arcjet error", error);
        next(error);
    }
}

export {ajDecision};

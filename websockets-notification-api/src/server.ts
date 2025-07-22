import { app } from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
    console.log(
        `HTTP Server running and listening in http://localhost:${env.PORT}`
    );
});

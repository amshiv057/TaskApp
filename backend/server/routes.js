

import detailsContent from "./api/v1/controllers/userDetails/routes";


















export default function routes(app) {
    app.use('/api/v1/userDetails', detailsContent)
    return app;
}
import { SessionsClient, DetectIntentRequest } from "dialogflow";

const uuid = require('uuid');



class Dialog {
    private projectId: string;
    constructor(projectId: string = "irrationalmanager") {
        this.projectId = projectId
    }
    createSession(): SessionsClient {
        const sessionClient = new SessionsClient();
        return sessionClient;
    }

    generateQueryRquest(sessionPath: string, querry): DetectIntentRequest {
        const request: DetectIntentRequest = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: querry,
                    languageCode: 'en-US',
                },
            },
        };
        return request
    }
    handleIntent(response, intent): string {
        console.log(intent)
        if (intent=="where is the repo"){}
        else if(intent=="describe the project"){}
        else if(intent=="welcome"){}

        return response
    }

    async handleQuerry(query: string) {
        let botResponse = ""
        try {
            const sessionClient: SessionsClient = this.createSession();
            const sessionId = uuid.v4();
            const sessionPath = sessionClient.sessionPath(this.projectId, sessionId);

            const request: DetectIntentRequest = this.generateQueryRquest(sessionPath, query)
            const responses = await sessionClient.detectIntent(request);
            console.log(responses)
            const result = responses[0].queryResult;
            let responseMessage: string = result.fulfillmentText;
            let intent = null;
            if (result.intent) {
                intent = result.intent.displayName
            }
            botResponse =
                this.handleIntent(responseMessage, intent)
        }

        catch (e) {
            botResponse = "something went wrong (google's fault) please try again"
        }
        finally {
            return botResponse;
        }
    }
}

export default Dialog;
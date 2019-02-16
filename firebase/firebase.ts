
import firebase from "firebase";


class FireDB{
private readonly database :firebase.database.Database;
  
    private static _instance: FireDB;

    private constructor()
    {
      const config = {
        apiKey: process.env.apiKey||null,
        authDomain: process.env.authDomain||null,
        databaseURL: process.env.databaseURL||null,
        projectId: process.env.projectId||null,
        storageBucket: process.env.storageBucket||null,
        messagingSenderId: process.env.messagingSenderId||null
      };
      firebase.initializeApp(config);
    this.database= firebase.database();
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}




const assert=require('assert');
const firebase=require('@firebase/testing');
const MY_PROJECT_ID="";
describe("Flash Cards",()=>
{
    it("Can read items from the read only section",async()=>
    {
        const db=firebase.initializeTestApp({projectID:MY_PROJECT_ID}).firestore();
        const testDoc=db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    });

    it("Cannot write items to the read only section",async()=>
    {
        const db=firebase.initializeTestApp({projectID:MY_PROJECT_ID}).firestore();
        const testDoc=db.collection("readonly").doc("testDoc");
        await firebase.assertFails(testDoc.set({testdata:"Hello"}));
    });
});

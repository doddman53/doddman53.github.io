olark('api.rules.defineRule', {

    // Specify a unique ID for this rule.
    // This helps the API to keep your rules separate from each other.
    id: '1',

    // The description summarizes what this rule does
    description: "offer help to a visitor after he has browsed 5 pages and hasn't chatted yet",

    // The condition will be checked whenever there is a relevant change in the chat.
    // Call the pass() function whenever the criteria is met
    condition: function(pass) {

        // Use the Visitor API to get information the page count
        olark('api.visitor.getDetails', function(details){

            if (details.pageCountForThisVisit >= 1 && !details.isConversing) {

                // The visitor has seen more than 5 pages, and the visitor hasn't started chatting yet
                pass();
            }

        });

    },

    // The action will be executed whenever the condition passes.
    // Limit the number of times this action will trigger using the perPage, perVisit, and perVisitor options.
    action: function() {
        olark('api.chat.sendMessageToVisitor', {
            body: "Hello there, do have any questions about this fancy how-to page?"
        });
    },

    // Restrict this action to execute only once per visit
    perVisit: false;

});
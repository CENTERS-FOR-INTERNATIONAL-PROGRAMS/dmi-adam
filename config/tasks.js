module.exports = [
    {
        name: 'case_investigation',
        title: 'task.title.case_investigation',
        icon: 'icon-investigation-outline-gray',
        appliesTo: 'contacts',
        appliesToType: ['case'],
        actions: [
            {
                form: 'case_investigation',
                modifyContent: function (content, contact, report, event) {
                    contact;
                    report;
                    event;
                }
            }
        ],
        events: [{
            days: 7, //7 days until due
            start: 7, //Show for 7 days before due day
            end: 1, //Show for 1 day after due
        }],
        resolvedIf: function (contact, report, event, dueDate) {
            return Utils.isFormSubmittedInWindow(
                contact.reports,
                'case_investigation',
                Utils.addDate(dueDate, -event.start).getTime(),
                Utils.addDate(dueDate, event.end + 1).getTime()
            );
        }
    },
    {
        name: 'case_management',
        title: 'task.title.case_management',
        icon: 'icon-management-outline-blue',
        appliesTo: 'contacts',
        appliesToType: ['case'],
        appliesIf: function (c) {
            return Utils.getMostRecentReport(c.reports, 'case_investigation');
        },
        actions: [
            {
                form: 'case_management',
                modifyContent: function (content, contact, report, event) {
                    content.outbreak_code = JSON.stringify();
                    contact;
                    report;
                    event;
                }
            }
        ],
        events: [{
            days: 7, //7 days until due
            start: 7, //Show for 7 days before due day
            end: 1, //Show for 1 day after due
        }],
        resolvedIf: function (contact, report, event, dueDate) {
            return Utils.isFormSubmittedInWindow(
                contact.reports,
                'case_management',
                Utils.addDate(dueDate, -event.start).getTime(),
                Utils.addDate(dueDate, event.end + 1).getTime()
            );
        }
    }
    // {
    //     name: 'task_cholera_lab_report',
    //     title: 'task.lab_form_cholera',
    //     icon: 'icon-lab-outline-gray',
    //     appliesTo: 'contacts',
    //     appliesIf: function (c) {
    //         return Utils.getMostRecentReport(c.reports, 'cholera_case_investigation');
    //     },
    //     appliesToType: ['person'],
    //     actions: [{ form: 'cholera_lab_form' }],
    //     events: [{
    //         start: 14,
    //         days: 14,
    //         end: 0,
    //     }],
    //     resolvedIf: function (contact, report, event, dueDate) {
    //         return Utils.isFormSubmittedInWindow(
    //             contact.reports,
    //             'cholera_lab_form',
    //             Utils.addDate(dueDate, -event.start).getTime(),
    //             Utils.addDate(dueDate, event.end + 1).getTime()
    //         );
    //     }
    // }
];
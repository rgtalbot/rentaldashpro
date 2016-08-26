

console.log(userID);
$('#add_todo_form').on('submit', function (e) {
    e.preventDefault();
    console.log('working');
    var date = $('#todoDate'),
        reminder = $('#todoReminder'),
        property = $('#propertySelect');

    database.ref('ownerProfiles/' + ownerKey + '/reminders/').push({
        reminder: reminder.val(),
        date: date.val(),
        property: property.val()
    });

    date.val('');
    reminder.val('');
    property.val('');

    sort();

    return false;
});

function sort() {
    database.ref('ownerProfiles/' + ownerKey + '/reminders/').on('value', function (snapshot, val) {

        $('#todoList').html('');

        database.ref('ownerProfiles/' + ownerKey + '/reminders/').orderByChild('date').on('child_added', function (snapshot) {
            if ($('#propertySelectDisplay').val() == 'All') {
                todoList(snapshot);
                console.log('here?');
            } else {
                var propertyKey = $('#propertySelectDisplay').val();
                console.log('property key', propertyKey);
                if (snapshot.val().property == propertyKey) {
                    todoList(snapshot);

                }
            }
        });
    });

}
sort();

function buildList(snapshot) {
    var datePull = snapshot.val().date,
        $date = moment(datePull).format('MM/DD/YYYY'),
        $reminder = snapshot.val().reminder,
        $row = $('<div>').addClass('row').attr('propID', snapshot.val().property).attr('key', snapshot.key),
        $dateDiv = $('<div>').addClass('col-xs-2').html($date),
        $reminderDiv = $('<div>').addClass('col-xs-8').html($reminder),
        $checkDiv = $('<div>').addClass('col-xs-2'),
        $checkButton = $('<button>').addClass('btn btn-success listBtn complete').on('click', completeTodo).html('&#10004;'),
        $deleteButton = $('<button>').addClass('btn btn-danger listBtn delete').on('click', removeTodo).html('&#10008;');


    $checkButton.appendTo($checkDiv);
    $deleteButton.appendTo($checkDiv);

    $dateDiv.appendTo($row);
    $reminderDiv.appendTo($row);
    $checkDiv.appendTo($row);

    $row.appendTo('#todoList');
    $('<hr>').appendTo('#todoList');
}

function todoList(snapshot) {
    var status = $('#toggleCompleted').val();
    if (status == "no") {
        if (snapshot.val().status !== 'completed') {
            buildList(snapshot);
        }
    } else if (status=="yes") {
        if (snapshot.val().status == 'completed') {
            buildList(snapshot);
            $('.complete').remove();
        }
    }
}

$('#propertySelectDisplay').change(sort);
$('#toggleCompleted').change(sort);

function removeTodo(e) {
    e.preventDefault();
    var key = $(this).closest('.row').attr('key');
    $('#todoList').empty();
    database.ref('ownerProfiles/' + ownerKey + '/reminders/' + key).remove().then(function () {
        sort();
        console.log('removed');
    });
    return false;
}

function completeTodo(e) {
e.preventDefault();
    var key = $(this).closest('.row').attr('key');
    database.ref('ownerProfiles/' + ownerKey + '/reminders/' + key + '/status').set('completed').then(function () {
        console.log('completed');
    });
    sort();
    return false;

}
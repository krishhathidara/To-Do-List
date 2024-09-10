let ulTasks = $('#ulTasks')
let ulDiscardedTasks = $('#ulDiscardedTasks')
let btnAdd = $('#btnAdd')
let btnReset = $('#btnReset')
let btnSort = $('#btnSort')
let btnCleanup = $('#btnCleanup')
let inpNewTask = $('#inpNewTask')

function addItem() {
  let listItem = $('<li>', {
    'class': 'list-group-item d-flex justify-content-between align-items-center',
  })

  let checkBox = $('<input>', {
    type: 'checkbox',
    class: 'form-check-input',
    click: () => {
      if (checkBox.is(':checked')) {
        moveToDiscarded(listItem, taskText.text())
        toggleInputButtons()
      }
    }
  })

  let taskText = $('<span>', {
    text: inpNewTask.val(),
    class: 'ml-2',
  })

  listItem.append(checkBox)
  listItem.append(taskText)
  ulTasks.append(listItem)

  inpNewTask.val('')
  toggleInputButtons()
}

function moveToDiscarded(listItem, taskText) {
  listItem.remove() 

  let discardedItem = $('<li>', {
    'class': 'list-group-item d-flex justify-content-between align-items-center',
  })

  let deleteButton = $('<button>', {
    'class': 'btn btn-danger btn-sm',
    text: 'Delete',
    click: () => {
      discardedItem.remove() 
    }
  })

  let discardedTaskText = $('<span>', {
    text: taskText,
    class: 'ml-2',
  })

  discardedItem.append(discardedTaskText)
  discardedItem.append(deleteButton)
  ulDiscardedTasks.append(discardedItem)
}

function clearDone() {
  $('#ulTasks .form-check-input:checked').closest('li').each((_, item) => {
    let taskText = $(item).find('span').text()
    moveToDiscarded($(item), taskText)
  })
  toggleInputButtons()
}

function sortTasks() {
  $('#ulTasks .form-check-input:checked').closest('li').appendTo(ulTasks)
}

function toggleInputButtons() {
  btnReset.prop('disabled', inpNewTask.val() == '')
  btnAdd.prop('disabled', inpNewTask.val() == '')
  btnSort.prop('disabled', ulTasks.children().length < 1)
  btnCleanup.prop('disabled', ulTasks.children().length < 1)
}

inpNewTask.keypress((e) => {
  if (e.which == 13) addItem()
})
inpNewTask.on('input', toggleInputButtons)

btnAdd.click(addItem)
btnReset.click(() => {
  inpNewTask.val('')
  toggleInputButtons()
})
btnCleanup.click(clearDone)
btnSort.click(sortTasks)

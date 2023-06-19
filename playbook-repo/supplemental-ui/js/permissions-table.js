import * as simpleDatatables from 'simple-datatables'

document.addEventListener('DOMContentLoaded', function () {
  initiateTable()
})

async function initiateTable () {
  // eslint-disable-next-line no-undef
  const jsonFileData = await fetch('https://reports.jenkins.io/github-jenkinsci-permissions-report.json')
  const jsonBody = await jsonFileData.json()

  const convertedObject = convertObject(jsonBody)

  const dataTable = new simpleDatatables.DataTable('#permissions', {
    data: convertedObject,
    searchable: true,
    fixedHeight: true,
  })

  dataTable.columns().remove([])
}

function convertObject (dataObject) {
  if (dataObject.length === 0) {
    return {
      headings: [],
      data: [],
    }
  }

  const obj = {
    // Quickly get the headings
    headings: ['Repository', 'User', 'Access'],

    // Data array
    data: [],
  }

  const len = dataObject.length
  // Loop over the objects to get the values
  for (let i = 0; i < len; i++) {
    obj.data[i] = []

    for (const p in dataObject[i]) {
      // eslint-disable-next-line no-prototype-builtins
      if (dataObject[i].hasOwnProperty(p)) {
        obj.data[i].push(dataObject[i][p])
      }
    }
  }

  return obj
}

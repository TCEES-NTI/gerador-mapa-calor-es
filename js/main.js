function initializeMap (data) {
  FusionCharts.ready(function() {
    var salesByState = new FusionCharts({
      type: 'maps/espiritosanto',
      renderAt: 'chart-container',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "entityFillHoverColor": "#cccccc",
          "numberPrefix": "%",
          "exportEnabled": "1",
          "theme": "fint"
        },
        "colorrange": {
          "minvalue": "0",
          "startlabel": "Low",
          "endlabel": "High",
          "code": "#FF2E2E",
          "gradient": "1",
          "color": [
            {
              "maxvalue": "50",
              "displayvalue": "",
              "code": "#FFFF2E"
            },
            {
              "maxvalue": "100",
              "code": "#2EAB58"
            }
          ]
        },
        "data": data
      }
    }).render()
  })
}

function csvParser(text, cabecalhos, idColumNumber, idColumName, valueColumNumber) {
  var lines = text.split('\n').filter(function(el){return el.length>0})
  if (cabecalhos) {
    lines = lines.splice(1)
  }
  var data = lines.map(function(line) {
    var columns = line.split(';')
    return {
      id: columns[idColumNumber - 1],
      value: parseFloat(columns[valueColumNumber - 1].replace(',', '.')) * 100,
      displayValue: columns[idColumName - 1],
      showLabel: "1",
      fontBold: "1"
    }
  })
  initializeMap(data)
}

function callParser (file) {
  try {
    var content = file.target.result
    var cabecalhos = document.getElementById('cabecalhos').checked
    var idColumNumber = document.getElementById('colunaId').value
    var idColumName = document.getElementById('colunaNome').value
    var valueColumNumber = document.getElementById('colunaValores').value
  } catch (err) {
    alert('Não foi possível selecionar as opções desejadas.')
    throw err
  }
  csvParser(content, cabecalhos, idColumNumber, idColumName, valueColumNumber)
}

function readFile() {
  var file = document.getElementById('fileinput').files[0]
  if (file) {
    var reader = new FileReader();
    reader.onload = callParser
    reader.readAsText(file)
  } else {
    alert('Falha ao carregar arquivo')
  }
}

document.getElementById('submit').addEventListener('click', readFile, false)

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
          "caption": "Annual Sales by State",
          "subcaption": "Last year",
          "entityFillHoverColor": "#cccccc",
          "numberPrefix": "%",
          "exportEnabled": "1",
          "showLabels": "1",
          "theme": "fint"
        },
        "colorrange": {
          "minvalue": "0",
          "startlabel": "Low",
          "endlabel": "High",
          "code": "#ff0000",
          "gradient": "1",
          "color": [
            {
              "maxvalue": "50",
              "displayvalue": "",
              "code": "#ffff00"
            },
            {
              "maxvalue": "100",
              "code": "#009933"
            }
          ]
        },
        "data": data
      }
    }).render()
  })
}

function csvParser(text, cabecalhos, idColumNumber, valueColumNumber) {
  var lines = text.split('\n').filter(function(el){return el.length>0})
  if (cabecalhos) {
    lines = lines.splice(1)
  }
  var data = lines.map(function(line) {
    var columns = line.split(';')
    return {
      id: columns[idColumNumber - 1],
      value: parseFloat(columns[valueColumNumber - 1].replace(',', '.')) * 100
    }
  })
  initializeMap(data)
}

function callParser (file) {
  try {
    var content = file.target.result
    var cabecalhos = document.getElementById('cabecalhos').checked
    var idColumNumber = document.getElementById('colunaId').value
    var valueColumNumber = document.getElementById('colunaValores').value
  } catch (err) {
    alert('Não foi possível selecionar as opções desejadas.')
    throw err
  }
  csvParser(content, cabecalhos, idColumNumber, valueColumNumber)
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

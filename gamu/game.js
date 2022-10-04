const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Du vaknar upp i en märklig skog, omringad av vakra lysande blommor.',
    options: [
      {
        text: 'plocka lite blommor innan du försöker hitta hem.',
        setState: { flower: true },
        nextText: 2
      },
      {
        text: 'ignorera blommorna, och försök hitta ut',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Du stöter på en äldre kvinna i skogen, hon har mycket pakning',
    options: [
      {
        text: 'Hjälp kvinnan bära sin pakning',
        nextText: 6
      },
      {
        text: 'byt ut blommorna mot en karta i hennes väska',
        requiredState: (currentState) => currentState.flower,
        setState: { flower: false, map: true },
        nextText: 3
      },
      {
        text: 'Ignorea kvinnan och gå vidare',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Du kommer äntligen ut ur skogen, men du känner fortfarande inte igen dig...Du ser.',
    options: [
      {
        text: 'Ett slott',
        nextText: 4
      },
      {
        text: 'En liten by',
        nextText: 5
      },
      {
        text: 'Skogen bakom dig',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Du beger dig mot slotet och knackar på porten. En drake tittar fram och bränner dig till aska.',
    
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Du kommer ner till by, och ingen förstår vad du pratar om? Men du ser den ändre damen från skogen',
    options: [
      {
        text: 'Prata med henen',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'Visa sig att hon är en häxa och leter efter en lärling',
    options: [
      {
        text: 'Bli häxans lärling',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Häxan blir jätte glad, och vill se vad du går för! Så hon flyger dig till slotet där en ont drake bor.',
    options: [
      {
        text: 'Bli vättskrämd och försk fly',
        nextText: 8
      },
      {
        text: 'Titta på häxan och fråga om du kan byta blommorna mot hennes brinnande svärd',
        requiredState: (currentState) => currentState.flower,
        setState: { flower: false, Sword: true },
        nextText: 9
      },
      {
        text: 'erbjud den karta så dem kan ta över mer plattser!',
        requiredState: (currentState) => currentState.map,
        nextText: 10
      },
      {
        text: 'Erbjud Dragen blomman',
        requiredState: (currentState) => currentState.flower,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Du visar rädsla framför draken, så nu blir du bränd till aska av den...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Häxar går med på det, och du lyckas besegra draken i epic combat, och nu älskar byborna dig, och du Påbärjar din magiska fighting resa som en DragonSlayer',
    
    options: [
      {
        text: 'Grattis!, vill spela igen?',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Draken tar emot kartan och gör dig till sin partner in crime. Tillsamans tar ni över värden och bränner allt i er väg.',
    options: [
      {
        text: 'Grattis...Tror jag? Spela igen?',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Dragen börjar rodna, men tar emot Blomorna och ni bestämmer en date, som leder till det första Mäniska drak relationen någon i den här dimentionsen hört om',
    options: [
      {
        text: 'Grattis din draksjusare! Spela igen?',
        nextText: -1
      }
    ]
  }
]

startGame()
fetch("https://theqoo.net/index.php?mid=nogizaka46&filter_mode=normal&category=831246894")
    .then(response => {
        return response.text()
    })
    .then(res => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(res, 'text/html')
        let timeTickers = doc.getElementsByClassName('time')
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0');
        let todayTickers = []
        for (let timeTicker of timeTickers) {
            if (timeTicker.textContent.trim().length == 5) {
                if (timeTicker.textContent.trim().slice(-2) == dd) {
                    todayTickers.push(timeTicker)
                }
            }
        }
        if (todayTickers.length > 0) {
            for (let i = 0; i < todayTickers.length; i++) {
                fromTimeGetUrl(todayTickers[i])
            }
        } else {
            let display = document.getElementById('display')
            display.textContent = "There is no Live today!"
        }

    })


async function fromTimeGetUrl(timeTicker) {
    let title = timeTicker.previousElementSibling;
    let livePostUrl = "https://theqoo.net/" + title.firstElementChild.getAttribute("href")
    let livePostTitle = title.firstElementChild.textContent;
    let display = document.getElementById('display')
    await fetch(livePostUrl)
        .then(response => {
            return response.text()
        })
        .then(res => {
            let parser = new DOMParser()
            let doc = parser.parseFromString(res, 'text/html')
            let anchors = doc.querySelectorAll('a')
            let success = false
            for (let i = 0; i < anchors.length; i++) {
                if (anchors[i].textContent == '클릭') {
                    if (String(anchors[i].getAttribute('href')).slice(-8) !== "chatroom") {
                        success = true
                        let str = String(anchors[i]).split('/')
                        let twitch = 'https://www.twitch.tv/' + str[str.length - 1]
                        let newAnchor = document.createElement('a')
                        let br = document.createElement('br')
                        newAnchor.setAttribute('href', twitch)
                        newAnchor.setAttribute('target', "_blank")
                        newAnchor.textContent = livePostTitle
                        display.appendChild(newAnchor)
                        display.appendChild(br)
                        display.appendChild(br)
                    }
                }
            }
            if (success === false) {
                let newString = document.createElement('div')
                let br = document.createElement('br')
                newString.textContent = livePostTitle + ' -The live is locked'
                display.appendChild(newString)
                display.appendChild(br)
                display.appendChild(br)
            }
        })

}

//https://www.twitch.tv/dbsktkaxh
//https://translate.google.com.tw/?hl=zh-TW&sl=ko&tl=ja&text=%EC%9D%BC%EB%B3%B8%20%EC%95%84%EC%82%AC%ED%9E%88TV%20LIVE%20%EB%86%80%EB%9E%98%ED%82%A4%EB%8A%94%20%EC%A0%80%ED%83%9D%20TRICK%20HOUSE%20%5B%ED%83%80%EB%AC%B4%EB%9D%BC%20%EB%A7%88%EC%9C%A0%5D%20(23%3A15~&op=translate
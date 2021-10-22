const btn = document.getElementById("btn"); // 버튼 메소드
const xInput = document.getElementById("xInput") // x값 메소드
const yInput = document.getElementById("yInput") // y값 메소드
let maxNum = 100, minNum = 10 // 배열크기 최솟,최댓값
let arr // 배열1초기화
let calc // 배열2초기화
let defaultLength = 750 // 총 길이
let playConfig = 0 // 타임스킵 실행여부
let count = 0


// ---------------------- 목록 ------------------------- //
// 오디오 테스트
// ------ [ 버튼 함수 ] ------
// 버튼 함수 - 입력
// 버튼 함수 - 시간
// 버튼 함수 - button_play
// 버튼 함수 - button_stop
// 버튼 함수 - button_oneturn
// ------ [ LifeGame ] ------
// LifeGame - 배열 생성
// LifeGame - 출력
// LifeGame - 계산 처리
// LifeGame - 새로고침



// 오디오 테스트 //
let audio_Error = new Audio('Probe_Error.MP3')
let audio_Build = new Audio('Probe_Build.MP3')
let audio_Stop = new Audio('Probe_Stop.wav')
let audio_TimeSkip = new Audio('Probe_TimeSkip.mp3')
let audio_Button = new Audio('Probe_Button.wav')
audio_Error.volume = 0.4
audio_Build.volume = 0.4
audio_Stop.volume = 0.4
audio_TimeSkip.volume = 0.8
audio_Button.volume = 0.4


// 버튼 함수 - 입력
function buttonClick() { 
    if (xInput.value > maxNum || yInput.value > maxNum ) {
        audio_Error.play()
        window.alert(maxNum+" 보다 작은 값이어야 합니다.") 
    }
    else if (xInput.value < minNum || yInput.value < minNum ) {
        audio_Error.play()
        window.alert(minNum+" 보다 큰 값이어야 합니다.")
    }
    else {
        audio_Build.play()
        arr = createArray(parseInt(xInput.value), parseInt(yInput.value), 0)
        calc = createArray(parseInt(xInput.value)+2, parseInt(yInput.value)+2, 0)
        arr[5][5] = 1
        arr[4][5] = 1
        arr[6][5] = 1
        arr[5][6] = 1
        arr[5][4] = 1
        arr[7][4] = 1
        arr[1][2] = 1
        arr[0][1] = 1
        arr[0][2] = 1
        arr[1][0] = 1
        createTimeButton()
        gamePlay()
    }
}


// 버튼 함수 - 시간
function createTimeButton() {
    document.write("<button type='button_play'><img src='icon_play.png' onclick='func_play()'></button>")
    document.write("<button type='button_stop'><img src='icon_stop.png' onclick='func_stop()'></button>")
    document.write("<button type='button_oneturn'><img src='icon_oneturn.png' onclick='func_oneturn()'></button>")
}


// 버튼 함수 - button_play
function func_play() {
    audio_TimeSkip.play()
    playConfig = 1
    func_playloop()
        function func_playloop() {
            setTimeout(function(){
                refresh()
                if (playConfig == 1) {
                    func_playloop()
                }
        },100)
    }
}

// 버튼 함수 - button_stop
function func_stop() {
    audio_Stop.play()
    playConfig = 0
}

// 버튼 함수 - button_oneturn
function func_oneturn() {
    audio_Button.play()
    if (playConfig == 0) {
        refresh()
    }
}

// -------------------------------------------------------- //

// LifeGame - 배열 생성
function createArray(xnum, ynum, init) {
    let a, i, j, mat = []
    for (let i = 0; i < xnum; i++) {
        a = []
        for (j = 0; j < ynum; j++){
            a[j] = init
        }
        mat[i] = a
    }
    return mat
}

function createArray2(xnum, ynum, init){
    var x = new Array(xnum);
    for(var i=0; i<xnum; i++){
        x[i] = new Array(ynum);
    }
    for(var i=0; i<xnum; i++){
        for(var j=0; j<ynum; j++){
            x[i][j]=init
        }
    }
    return x
}

// LifeGame - 출력
function gamePlay() {
    let xnum = parseInt(xInput.value), ynum = parseInt(yInput.value)
    let ratioLength = 0
    if (xnum > ynum) {
        ratioLength = xnum / ynum
        document.write("<table id='btnTable' width='"+defaultLength/ratioLength+"px' height='"+defaultLength+"px'>")
    }
    else {
        ratioLength = ynum / xnum
        document.write("<table id='btnTable' width='"+defaultLength+"px' height='"+defaultLength/ratioLength+"px'>")
    }

    for (let i = 0; i < xnum; i++) {
        document.write("<tr>")
        for (let j = 0; j < ynum; j++) {
            if (arr[i][j] == 0) {
                document.write("<td id = 'arrBtn["+i+"]["+j+"]' bgcolor = '#aaaaaa'>")
            }
            else {
                document.write("<td id = 'arrBtn["+i+"]["+j+"]' bgcolor = '#333333'>")
            }
            document.write("</td>")
        }
        document.write("</tr>")
    }
    document.write("</table>")
}


// LifeGame - 계산 처리
function calculator() {
    let xnum = parseInt(xInput.value)
    let ynum = parseInt(yInput.value)
    let sum = 0
        // calc 값 동화
        for(let i = 0; i < xnum; i++) {
            for(let j = 0; j < ynum; j++){
                calc[i+1][j+1]=arr[i][j]
            }
        }
        // 계산 과정
    for(let i = 0; i < xnum; i++) {
        for(let j = 0; j < ynum; j++) {
            for(let x = 0; x < 3; x++) {
                for(let y = 0; y < 3; y++) {
                    if(x == 1 && y == 1) {
                        
                    }
                    else if (calc[i+x][j+y] == 1) {
                        sum = sum + 1
                    }
                }
            }
            if(sum == 3) {
                arr[i][j] = 1
            }
            else if(sum == 2 && arr[i][j] == 1) {
                arr[i][j] = 1
            }
            else {
                arr[i][j] = 0
            }
            sum = 0
        }
    }

}


// LifeGame - 새로고침
function refresh() {
    calculator()
    document.getElementById('btnTable').remove()
    gamePlay()
}

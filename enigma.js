const Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const R1 = ['E','J','R','I','N','K','X','W','F','A','L','Z','H','Q','T','G','Y','P','B','V','D','M','O','C','S','U'];
const R2 = ['J','B','Y','T','G','M','U','A','N','R','W','H','X','O','D','V','F','P','E','Z','K','Q','I','S','C','L'];
const R3 = ['F','X','O','I','R','M','J','V','H','K','A','B','E','G','C','N','L','D','T','Z','W','U','S','P','Q','Y'];
const R4 = ['O','F','G','E','T','Z','U','P','C','H','A','N','S','X','B','Q','M','D','V','Y','W','K','I','L','J','R'];
const R5 = ['M','C','A','W','B','T','O','H','U','Y','D','N','Z','V','S','K','I','G','F','E','P','X','J','Q','L','R'];
const R6 = ['D','U','K','J','M','C','S','E','L','Y','W','N','P','X','G','Z','I','A','O','V','R','Q','T','B','F','H'];
const Re1 = ['L','G','X','H','C','K','E','O','R','W','A','V','Q','D','U','M','F','I','T','J','S','P','B','Z','Y','N'];
const Re2 = ['U','D','I','N','J','M','Q','B','S','F','Z','P','E','G','L','K','W','X','Y','C','R','V','O','A','T','H'];
const R = [R1, R2, R3, R4, R5, R6];
function Enigma(){
    console.log('----------------------------------------');
    var output = '';
    let r1 = rotor('rotor1');
    let r2 = rotor('rotor2');
    let r3 = rotor('rotor3');
    //program is finish if same number rotor was selected.
    if(r1 == r2 || r2 == r3 || r3 == r1){
        window.alert("You can't use same number rotor at the same time.");
        console.log('same number rotor was selected.');
        return 0;
    }
    let c1_1 = document.getElementById('change11').value;
    let c1_2 = document.getElementById('change12').value;
    let c2_1 = document.getElementById('change21').value;
    let c2_2 = document.getElementById('change22').value;
    let c3_1 = document.getElementById('change31').value;
    let c3_2 = document.getElementById('change32').value;
    //program is finish if same alphabet pair was selected.
    if(c1_1 == c1_2 || c1_1 == c2_1 || c1_1 == c2_2 || c1_1 == c3_1 || c1_1 == c3_2 || c1_2 == c2_1 || c1_2 == c2_2 || c1_2 == c3_1 || c1_2 == c3_2 || c2_1 == c2_2 || c2_1 == c3_1 || c2_1 == c3_2 || c2_2 == c3_1 || c2_2 == c3_2 || c3_1 == c3_2){
        window.alert("You can't choose same alphabet pair at the same time.");
        console.log('same alphabet pair was selected.');
        return 0;
    }
    //shift number
    let shift1 = document.getElementById('Initial1').value;
    let shift2 = document.getElementById('Initial2').value;
    let shift3 = document.getElementById('Initial3').value;
    shift1 -= 0;
    shift2 -= 0;
    shift3 -= 0;
    //input
    let input = document.getElementById('Intxt').value;
    let L = input.length;
    //indicate current situation
    {
        console.log('rotor1 : ' + r1);
        console.log('rotor2 : ' + r2);
        console.log('rotor3 : ' + r3);
        console.log('1st : ' + c1_1 + ' <=> ' + c1_2);
        console.log('2nd : ' + c2_1 + ' <=> ' + c2_2);
        console.log('3rd : ' + c3_1 + ' <=> ' + c3_2);
        console.log('Input : ' + input);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    for(let i = 0; i < L; i++){
        var temp = input[i];
        var role1 = shift1 + i;
        var role2 = shift2 + Math.floor(role1 / 26);
        var role3 = shift3 + Math.floor(role2 / 26);
        console.log('role1 : ' + role1);
        console.log('role2 : ' + role2);
        console.log('role3 : ' + role3);
        //plug board
        temp = PlugBoard(temp, c1_1, c1_2);
        temp = PlugBoard(temp, c2_1, c2_2);
        temp = PlugBoard(temp, c3_1, c3_2);
        //1st-Rotor(Forward direction)
        temp = RotorF(r1, temp, role1);
        //2nd-Rotor(Forward direction)
        temp = RotorF(r2, temp, role2);
        //3rd-Rotor(Forward direction)
        temp = RotorF(r3, temp, role3);
        //Reflector
        for(var j = 0; j < 26; j++){
            if(temp == Re1[j]){
                temp = Re2[j];
                break;
            }
        }
        //3rd-Rotor(Reverse direction)
        temp = RotorR(r3, temp, role3);
        //2nd-Rotor(Reverse direction)
        temp = RotorR(r2, temp, role2);
        //1st-Rotor(Reverse direction)
        temp = RotorR(r1, temp, role1);
        //plug board
        temp = PlugBoard(temp, c1_1, c1_2);
        temp = PlugBoard(temp, c2_1, c2_2);
        temp = PlugBoard(temp, c3_1, c3_2);
        output += temp;
    }
    console.log('Output : ' + output);
    document.getElementById("Output").innerHTML = output;
    console.log('Finish !');
    return 0;
}
function rotor(name){
    var element = document.getElementsByName(name);
    for(var i = 0; i < element.length; i++){
        if (element[i].checked) {
          var r = element[i].value;
          break;
        }
    }
    return r;
}
function PlugBoard(letter, change1, change2){
    if(letter == change1){
        letter = change2;
    } else if(letter == change2){
        letter = change1;
    }
    return letter;
}
function RotorF(rn, temp, role){
    for(var k = 0; k < 6; k++){
        if(rn == k + 1){
            var r = R[k];
            break;
        }
    }
    for(var n = 0; n < 26; n++){
        if(temp == Alphabet[n]){
            temp = r[(role + n) % 26];
            break;
        }
    }
    return temp;
}
function RotorR(rn, temp, role){
    for(var k = 0; k < 6; k++){
        if(rn == k + 1){
            var r = R[k];
            break;
        }
    }
    for(var n = 0; n < 26; n++){
        if(temp == r[n]){
            temp = Alphabet[(26 * (1 + Math.floor(role / 26)) + n - role) % 26];
            break;
        }
    }
    return temp;
}
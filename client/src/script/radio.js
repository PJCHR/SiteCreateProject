export function checkRadio(v,id){
    console.log(v, id);

    // 만약 v가 1이면 id는 "" 아니라면 none, v가 2이면 "" 아니면 none 이걸 return id;


    // if(v === 1){
    //     document.getElementById(id).style.display = ""; // 기본배송지
    // }else{
    //     document.getElementById(id).style.display = "none"; // 숨김
    // }
    // if(v === 2){
    //     document.getElementById(id).style.display = ""; // 직접입력
    // }else{
    //     document.getElementById(id).style.display = "none"; // 숨김
    // }
    console.log('속성값 확인:' + document.getElementById('addr1').style);
}
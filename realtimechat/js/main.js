firebase.database().ref("mykey").on("value", function(snapshot) {
    // mykeyの値が変化するたびに実行される
    console.log("got value: " + snapshot.val());
});

var num = 0;
function setNewValue() {
    // numを1増やしてmykeyに保存
    num++;
    console.log("set: " + num);
    firebase.database().ref("mykey").set(num);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("ログインしました");
        onLogin();
    } else {
        console.log("ログインしていません");
        firebase.auth().signInAnonymously().catch(function(error) {
            console.error("ログインエラー", error);
        });
    }
});

$(document).ready(function() {
    // id="my-button"をクリックしたらsetNewValueを実行
    $("#my-button").click(setNewValue);
});
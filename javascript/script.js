
// ak z getItem nedostaneme nic, tak sa do premennej "chaptersDoneNum" ulozi 0, inak v nej bude pocet hotovych chapterov
let chaptersDoneNum = sessionStorage.getItem("chaptersDoneNum") ? JSON.parse(sessionStorage.getItem("chaptersDoneNum")) : 0;
sessionStorage.setItem("chaptersDoneNum", JSON.stringify(chaptersDoneNum));

// "idsDone" obsahuje ID-ecka tlacidiel "Done", ktore su na konci kazdeho chapteru
// ak z getItem nedostaneme nic, tak sa vytvori prazdne pole, inak sa do nej nahraju ziskane hodnoty ID-ciek
let idsDone = sessionStorage.getItem('ids') ? JSON.parse(sessionStorage.getItem('ids')) : [];

// tento cyklus prechadza polom idsDone a ID-ckam tlacidiel ktore sa tam nachadzaju prida funkciu disabled - znemoznenie kliknutia na tlacidlo
for (let i = 0; i < idsDone.length; i++) {
    let hashtagId = '#' + idsDone[i]; // napr. #tl1
    $(hashtagId).prop('disabled', true);
}

// funkcia sa zavola po stlaceni tlacidla "Yes, I am done" v modali (modal je vyvolany po stlaceni tlacidla "Done")
function chapterDone() {
    // po stlaceni tlacidla "Yes, I am done" sa zmeni jeho text na "Chapter is done" a zmeni sa jeho vzhlad
    document.getElementById("chapterDone").innerHTML = "Chapter is done";
    $('.chapterDone').addClass('btn-success');
    $('.chapterDone').removeClass('btn-dark');

    // zneaktivnenie tlacidla "Chapter is done"
    $('#chapterDone').prop('disabled', true); // https://stackoverflow.com/questions/17327668/best-way-to-disable-button-in-twitters-bootstrap

    // ulozenie ID tlacidla "Done" s triedou "done" do premennej "tlId"
    let tlId = document.getElementsByClassName("done")[0].id;

    // po kliknuti na tlacidlo "Yes, I am done" sa ikrementuje hodnota premennej "chaptersDoneNum" 
    chaptersDoneNum++;

    // hodnota v premennej "chaptersDoneNum" sa ulozi do sessionStorage
    sessionStorage.setItem("chaptersDoneNum", JSON.stringify(chaptersDoneNum)); // https://www.w3schools.com/js/js_api_web_storage.asp + Dávid Oliver Spirczak 

    // zneaktivnenie tlacidla "Done" a zmena vzhladu (ak bola uz raz chapter oznacena ako hotova, nemozno to zmenit)
    $('.done').addClass('btn-success');
    $('.done').removeClass('btn-outline-success');
    $('.done').prop('disabled', true);

    // ID-cko tlacidla "Done" sa ulozi do pola "idsDone" a do sessionStorage
    idsDone.push(tlId);
    sessionStorage.setItem("ids", JSON.stringify(idsDone));
}

// ked je hodnota "chaptersDoneNum" 6, tlacidlo na podstranke "test.html" bude aktivne
if (chaptersDoneNum == 6)
{
    $('#startTest').prop('disabled', false);
}

// ak je tlacidlo na podstranke "test.html" neaktivne, nikam neodkazuje
// ak sa premenna "chaptersDoneNum" rovna 6, tlacidlo je aktivne a ziska aj odkaz na podstranku "realtest.html"
function start_test_button() {
    if (chaptersDoneNum == 6)
    {
        location.href = "realtest.html";
    }
}

// na podstranke "test.html" sa po stlaceni tlacidla "Done" (z podstraniek kapitol) aktualizuje pocet hotovych kapitol
document.getElementById("numDoneChapters").innerHTML = JSON.stringify(chaptersDoneNum) + "/6";
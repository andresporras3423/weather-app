const pageLoad = () => ({
    divContent : document.getElementById("content"),
    divList : document.createElement("div"),
    divAdd : document.createElement("div"),
    paragraph : document.createElement("p"),
    buttonUpdate : document.createElement("button"),
    headAdd : document.createElement("h3"),
    nameAdd : document.createElement("input"),
    scoreAdd : document.createElement("input"),
    buttonAdd : document.createElement("button"),
  loadPageContent() {
      const that = this;
    this.divContent.classList.add("col-12");
    this.divContent.classList.add("row");
    this.divContent.appendChild(this.divList);
    this.divContent.appendChild(this.divAdd);
    this.loadDivListContent();
    this.loadDivAddContent();
    this.buttonUpdate.onclick= function() {that.updateList()};
    this.buttonAdd.onclick=function(){that.addScore()};
    this.updateList();
  },
  loadDivListContent() {
    this.divList.classList.add("col-8");
    this.paragraph.classList.add("child-width");
    this.buttonUpdate.innerText="Update list";
    this.divList.appendChild(this.paragraph);
    this.divList.appendChild(this.buttonUpdate);
  },
  loadDivAddContent() {
    this.divAdd.classList.add("child-width");
    this.divAdd.classList.add("col-4");
    this.nameAdd.type="text";
    this.scoreAdd.type="number";
    this.headAdd.innerText="ADD NEW SCORE";
    this.nameAdd.placeholder="Here username";
    this.scoreAdd.placeholder="10";
    this.buttonAdd.innerText="Add";
    this.divAdd.appendChild(this.headAdd);
    this.divAdd.appendChild(this.nameAdd);
    this.divAdd.appendChild(this.scoreAdd);
    this.divAdd.appendChild(this.buttonAdd);
  },
  updateList() {
    this.paragraph.innerHTML="";
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/satVX3CEJZpfG8bj7ytu/scores/', {
        method: 'get'
      })
      .then(response => response.text())
      .then(json => {   
        let scores = JSON.parse(json).result;
        Object.values(scores).forEach((score, index)=>{
          const label = document.createElement("label");
          label.innerText=`${index+1}) user: ${score.user}, score: ${score.score}`;
          this.paragraph.appendChild(label);
        });
      })
    .catch(function(err) {
      console.log(err);
    });
  },
  addScore() {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/satVX3CEJZpfG8bj7ytu/scores/', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          user: this.nameAdd.value,
          score: this.scoreAdd.value
        })
      })
      .then(response => {                    
        this.nameAdd.value="";
        this.scoreAdd.value=0;
      })
    .catch(function(err) {
      console.log(err);
    });
  }
});
export default pageLoad;
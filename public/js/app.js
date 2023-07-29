class Cards {
    constructor(contentHolder, cards, displayTotal = 3) {
        this.pageCounter = 1;
        this.cardBase = '';
        this.displayTotal = displayTotal;
        this.totalCards = displayTotal;
        this.cards = cards;
        this.contentHolder = contentHolder;
        this.moreBtn = document.getElementById('more');
        this.less = document.getElementById('less');
        this.moreBtn.addEventListener('click', this.loadMore.bind(this));
        this.less.addEventListener('click', this.loadLess.bind(this));
        this.updateCardContent(this.cards.slice(0, this.totalCards));
        this.setDisabled();
    }
    setDisabled() {
        this.less.disabled = this.displayTotal <= this.totalCards;
        this.moreBtn.disabled = this.displayTotal >= this.cards.length;
    }
    loadMore() {
        this.pageCounter =
            this.totalCards * this.pageCounter >= this.cards.length
                ? this.pageCounter
                : ++this.pageCounter;
        this.displayTotal =
            this.totalCards * this.pageCounter >= this.cards.length
                ? this.cards.length
                : this.totalCards * this.pageCounter;
        this.setDisabled();
        this.updateCardContent(this.cards.slice(this.totalCards * this.pageCounter - this.totalCards, this.totalCards * this.pageCounter));
    }
    loadLess() {
        this.cardBase = '';
        this.pageCounter = this.pageCounter > 1 ? --this.pageCounter : 1;
        if (this.totalCards * this.pageCounter > this.cards.length) {
            this.displayTotal = this.cards.length - this.totalCards;
        }
        else if (this.totalCards * this.pageCounter <= this.totalCards) {
            this.displayTotal = this.totalCards;
        }
        else {
            this.displayTotal = this.displayTotal - this.totalCards;
        }
        this.setDisabled();
        this.updateCardContent(this.cards.slice(0, this.displayTotal));
    }
    cardFun(data) {
        data.forEach((card) => {
            const currentItem = card;
            const address = currentItem.address;
            const company = currentItem.company;
            this.cardBase += `
      <div class="card">
        <div class='head'>
        <h2>${currentItem.name}</h2>
        <span>"${currentItem.username}"</span>
        </div>
        <div class="content-info">
          <div><p>${address.street} ${address.suite} ${address.city} ${address.zipcode}</p></div>
          <div>
            <h3>
              ${company.name}
            </h3>
            <p>${company.catchPhrase}</p>
            <p>${currentItem.phone}</p>
            <p>${currentItem.email}</p>
            <p>${currentItem.website}</p>
          </div>
        </div>
      </div>`;
        });
    }
    updateCardContent(data) {
        this.cardFun(data);
        this.contentHolder.innerHTML = this.cardBase;
    }
}
fetch('https://jsonplaceholder.typicode.com/users')
    .then((data) => data.json())
    .then((data) => {
    const elem = document.getElementById('main-content');
    if (elem) {
        new Cards(elem, data);
    }
})
    .catch((error) => {
    console.error('Error fetching data:', error);
});
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8iLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4QkEsTUFBTSxLQUFLO0lBV1QsWUFDRSxhQUEwQixFQUMxQixLQUFZLEVBQ1osZUFBdUIsQ0FBQztRQWJsQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBYTVCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQXNCLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBc0IsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1FB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
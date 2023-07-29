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
            const { name, username, address: { street, suite, city, zipcode }, company: { name: companyName, catchPhrase }, phone, email, website, } = card;
            this.cardBase += `
    <div class="card">
      <div class='head'>
        <h2>${name}</h2>
        <span>"${username}"</span>
      </div>
      <div class="content-info">
        <div><p>${street} ${suite} ${city} ${zipcode}</p></div>
        <div>
          <h3>${companyName}</h3>
          <p>${catchPhrase}</p>
          <p>${phone}</p>
          <p>${email}</p>
          <p><a href=${website} target="_blank">${website}</a></p>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8iLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4QkEsTUFBTSxLQUFLO0lBV1QsWUFDRSxhQUEwQixFQUMxQixLQUFZLEVBQ1osZUFBdUIsQ0FBQztRQWJsQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBYTVCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQXNCLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBc0IsQ0FBQztRQUVqRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakUsQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsV0FBVztZQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDbEIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWTtZQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDbkMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLFFBQVE7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDekQ7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDekQ7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU8sT0FBTyxDQUFDLElBQWM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BCLE1BQU0sRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUN6QyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUMzQyxLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sR0FDUixHQUFHLElBQUksQ0FBQztZQUVULElBQUksQ0FBQyxRQUFRLElBQUk7OztjQUdULElBQUk7aUJBQ0QsUUFBUTs7O2tCQUdQLE1BQU0sSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLE9BQU87O2dCQUVwQyxXQUFXO2VBQ1osV0FBVztlQUNYLEtBQUs7ZUFDTCxLQUFLO3VCQUNHLE9BQU8sb0JBQW9CLE9BQU87OztXQUc5QyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBYztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0MsQ0FBQztDQUNGO0FBRUQsS0FBSyxDQUFDLDRDQUE0QyxDQUFDO0tBQ2hELElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzNCLElBQUksQ0FBQyxDQUFDLElBQWMsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsSUFBSSxJQUFJLEVBQUU7UUFDUixJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDdkI7QUFDSCxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLENBQUMifQ==
export interface ICards {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

class Cards {
  private pageCounter: number = 1;
  private displayTotal: number;
  private cardBase: string = '';
  private totalCards: number;

  private cards: ICards[];
  private contentHolder: HTMLElement;
  private moreBtn: HTMLButtonElement;
  private less: HTMLButtonElement;

  constructor(
    contentHolder: HTMLElement,
    cards: ICards[],
    displayTotal: number = 3
  ) {
    this.displayTotal = displayTotal;
    this.totalCards = displayTotal;
    this.cards = cards;
    this.contentHolder = contentHolder;
    this.moreBtn = document.getElementById('more') as HTMLButtonElement;
    this.less = document.getElementById('less') as HTMLButtonElement;

    this.moreBtn.addEventListener('click', this.loadMore.bind(this));
    this.less.addEventListener('click', this.loadLess.bind(this));
    this.updateCardContent(this.cards.slice(0, this.totalCards));
    this.setDisabled();
  }

  private setDisabled(): void {
    this.less.disabled = this.displayTotal <= this.totalCards;
    this.moreBtn.disabled = this.displayTotal >= this.cards.length;
  }

  private loadMore(): void {
    this.pageCounter =
      this.totalCards * this.pageCounter >= this.cards.length
        ? this.pageCounter
        : ++this.pageCounter;
    this.displayTotal =
      this.totalCards * this.pageCounter >= this.cards.length
        ? this.cards.length
        : this.totalCards * this.pageCounter;
    this.setDisabled();
    this.updateCardContent(
      this.cards.slice(
        this.totalCards * this.pageCounter - this.totalCards,
        this.totalCards * this.pageCounter
      )
    );
  }

  private loadLess(): void {
    this.cardBase = '';
    this.pageCounter = this.pageCounter > 1 ? --this.pageCounter : 1;

    if (this.totalCards * this.pageCounter > this.cards.length) {
      this.displayTotal = this.cards.length - this.totalCards;
    } else if (this.totalCards * this.pageCounter <= this.totalCards) {
      this.displayTotal = this.totalCards;
    } else {
      this.displayTotal = this.displayTotal - this.totalCards;
    }
    this.setDisabled();
    this.updateCardContent(this.cards.slice(0, this.displayTotal));
  }

  private cardFun(data: ICards[]): void {
    data.forEach((card) => {
      const {
        name,
        username,
        address: { street, suite, city, zipcode },
        company: { name: companyName, catchPhrase },
        phone,
        email,
        website,
      } = card;

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

  private updateCardContent(data: ICards[]): void {
    this.cardFun(data);
    this.contentHolder.innerHTML = this.cardBase;
  }
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then((data) => data.json())
  .then((data: ICards[]) => {
    const elem = document.getElementById('main-content');

    if (elem) {
      new Cards(elem, data);
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });


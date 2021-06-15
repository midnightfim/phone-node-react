class Numbers {
    numbers;

    constructor(numbers) {
        this.numbers = numbers || [];
    }

    addNumber(number) {
        // здесь ты должен закинуть в БД новый номер и пушануть новый номер в массив
        this.numbers.push(number);
    }

    getNumbers() {
       return this.numbers;
    }
}

module.exports = { Numbers };

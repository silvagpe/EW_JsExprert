{
    at: '{{date(new Date()).toISOString()}}',
    products: [
        '{{repeat(100, 100)}}',
        {
            description: '{{lorem(4, "words")}}',
            name: '{{lorem(1, "words")}}',
            price: '{{floating(100, 2000, 2, "000.00")}}',
            tmpProperty: 'undefined',
            activePromoId: '{{random(integer(0, 100), null)}}'
        }
    ]
}
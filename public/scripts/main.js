particlesJS.load('background', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

FontAwesome.library.add({
    prefix: 'fa-custom',
    iconName: 'revolt',
    icon: [
        448, 448, [],
        "e001",
        'M163.006,417.598 L166.015,306.629 L63.506,343.841 L129.87,255.871 L25.5,224.5 L129.87,193.129 L63.506,105.159 L166.015,142.371 L163.006,31.402 L224.5,122.983 L285.995,31.402 L282.985,142.371 L385.495,105.159 L319.13,193.13 L423.5,224.5 L319.13,255.871 L385.494,343.841 L282.984,306.629 L285.994,417.598 L224.5,326.017 z'
    ]
})
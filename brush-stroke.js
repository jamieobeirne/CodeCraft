// CSS Paint API Worklet for textured brush stroke
registerPaint('brushStroke', class {
    static get inputProperties() {
        return [
            '--brush-color',
            '--brush-opacity',
            '--brush-width',
            '--brush-height'
        ];
    }

    paint(ctx, size, properties) {
        // Get custom properties with defaults
        const color = properties.get('--brush-color') || '#069e2d';
        const opacity = parseFloat(properties.get('--brush-opacity')) || 0.8;
        const brushWidth = parseFloat(properties.get('--brush-width')) || size.width;
        const brushHeight = parseFloat(properties.get('--brush-height')) || size.height * 0.3;

        // Set up context
        ctx.save();
        ctx.globalAlpha = opacity;

        // Create a curved brush stroke path
        const centerX = size.width / 2;
        const startY = size.height * 0.2;
        const endY = size.height * 0.8;
        const controlX1 = size.width * 0.3;
        const controlY1 = size.height * 0.4;
        const controlX2 = size.width * 0.7;
        const controlY2 = size.height * 0.6;

        // Create the main stroke path
        ctx.beginPath();
        ctx.moveTo(centerX - brushWidth / 2, startY);
        ctx.bezierCurveTo(
            controlX1, controlY1,
            controlX2, controlY2,
            centerX + brushWidth / 2, endY
        );

        // Create texture by drawing multiple overlapping strokes
        ctx.strokeStyle = color;
        ctx.lineWidth = brushHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw multiple textured strokes for brush effect
        for (let i = 0; i < 15; i++) {
            const offset = (Math.random() - 0.5) * brushWidth * 0.3;
            const widthVariation = brushHeight * (0.7 + Math.random() * 0.6);
            
            ctx.beginPath();
            ctx.moveTo(centerX - brushWidth / 2 + offset, startY + (Math.random() - 0.5) * 10);
            ctx.bezierCurveTo(
                controlX1 + offset * 0.5, controlY1 + (Math.random() - 0.5) * 15,
                controlX2 + offset * 0.5, controlY2 + (Math.random() - 0.5) * 15,
                centerX + brushWidth / 2 + offset, endY + (Math.random() - 0.5) * 10
            );
            
            ctx.lineWidth = widthVariation;
            ctx.globalAlpha = opacity * (0.4 + Math.random() * 0.6);
            ctx.stroke();
        }

        // Add texture with small random dots and strokes
        ctx.fillStyle = color;
        for (let i = 0; i < 50; i++) {
            const x = centerX + (Math.random() - 0.5) * brushWidth * 1.2;
            const y = startY + Math.random() * (endY - startY);
            const radius = Math.random() * 3;
            
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.globalAlpha = opacity * (0.2 + Math.random() * 0.3);
            ctx.fill();
        }

        // Add some longer texture strokes
        for (let i = 0; i < 20; i++) {
            const x1 = centerX + (Math.random() - 0.5) * brushWidth * 1.2;
            const y1 = startY + Math.random() * (endY - startY);
            const x2 = x1 + (Math.random() - 0.5) * 30;
            const y2 = y1 + (Math.random() - 0.5) * 20;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = Math.random() * 2 + 1;
            ctx.globalAlpha = opacity * (0.1 + Math.random() * 0.4);
            ctx.stroke();
        }

        ctx.restore();
    }
});


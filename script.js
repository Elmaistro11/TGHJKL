* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-bg: #0a1812;
    --secondary-bg: #0f2619;
    --accent-gold: #d4a574;
    --accent-dark-gold: #b8860b;
    --text-light: #e8e8e8;
    --text-muted: #a0a0a0;
    --border-color: #1a3a2a;
    --card-bg: rgba(10, 28, 20, 0.85);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0a1812 0%, #0d2315 50%, #0a1812 100%);
    background-attachment: fixed;
    color: var(--text-light);
    overflow-x: hidden;
    direction: rtl;
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: linear-gradient(180deg, rgba(15, 38, 25, 0.95) 0%, rgba(10, 28, 20, 0.9) 100%);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
}

.cup-icon {
    font-size: 1.8rem;
    color: var(--accent-gold);
    text-shadow: 0 0 10px rgba(212, 165, 116, 0.5);
}

.brand-name {
    color: var(--text-light);
    font-weight: 700;
}

.theme-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--accent-gold);
    transition: transform 0.3s ease;
}

.theme-toggle:hover {
    transform: rotate(20deg);
}

/* Hero Section */
.hero {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.hero-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(10, 24, 18, 0.8) 0%, rgba(10, 28, 20, 0.85) 50%, rgba(15, 38, 25, 0.9) 100%);
    z-index: 2;
}

.hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.premium-badge {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--accent-gold);
    border-radius: 50px;
    color: var(--accent-gold);
    font-size: 0.9rem;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    animation: fadeInDown 0.8s ease-out;
    box-shadow: 0 0 15px rgba(212, 165, 116, 0.3);
}

.hero-title {
    font-size: 4rem;
    font-weight: 700;
    color: var(--text-light);
    margin-bottom: 1rem;
    letter-spacing: 3px;
    animation: fadeInDown 0.8s ease-out 0.2s backwards;
    text-shadow: 0 0 20px rgba(212, 165, 116, 0.2);
}

.hero-subtitle {
    font-size: 1.3rem;
    color: var(--text-muted);
    margin-bottom: 3rem;
    font-weight: 300;
    animation: fadeInDown 0.8s ease-out 0.4s backwards;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--accent-gold);
    font-size: 0.9rem;
    letter-spacing: 2px;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    50% {
        transform: translateX(-50%) translateY(-10px);
    }
}

/* Categories Section */
.categories {
    background: linear-gradient(180deg, rgba(10, 28, 20, 0.9) 0%, rgba(15, 38, 25, 0.95) 100%);
    padding: 3rem 1.5rem;
    text-align: center;
}

.category-line {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
    margin: 0 auto 2rem;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(212, 165, 116, 0.5);
}

.categories-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
}

.category-btn {
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 50px;
    background-color: transparent;
    color: var(--text-light);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.category-btn:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
    box-shadow: 0 0 15px rgba(212, 165, 116, 0.3);
}

.category-btn.active {
    background: linear-gradient(135deg, var(--accent-gold), #c89860);
    color: #0a1812;
    border-color: var(--accent-gold);
    font-weight: 600;
    box-shadow: 0 0 20px rgba(212, 165, 116, 0.5);
}

.category-btn .en {
    font-weight: 600;
    letter-spacing: 1px;
}

.category-btn .ar {
    font-size: 0.9rem;
}

.category-btn .emoji {
    font-size: 1.2rem;
}

/* Products Section */
.products {
    background: linear-gradient(180deg, rgba(10, 28, 20, 0.9) 0%, rgba(15, 38, 25, 0.95) 100%);
    padding: 3rem 1.5rem;
}

.products-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.product-card {
    background: linear-gradient(135deg, rgba(15, 38, 25, 0.6) 0%, rgba(10, 28, 20, 0.8) 100%);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    cursor: pointer;
    animation: slideUp 0.6s ease-out;
    backdrop-filter: blur(5px);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card:hover {
    transform: translateY(-10px);
    border-color: var(--accent-gold);
    box-shadow: 0 20px 40px rgba(212, 165, 116, 0.3);
}

.product-image {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a2a22, #0f1f18);
}

.product-image svg {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image svg {
    transform: scale(1.05);
}

.product-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.5rem;
    border-radius: 50%;
    border: 1px solid var(--accent-gold);
}

.product-info {
    padding: 1.5rem;
}

.product-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
}

.product-name .ar {
    font-size: 1.2rem;
    color: var(--text-light);
    font-weight: 600;
}

.product-name .en {
    font-size: 1rem;
    color: var(--text-muted);
    letter-spacing: 1px;
}

.product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--accent-gold);
    font-weight: 600;
    font-size: 1.1rem;
}

.product-price .ar {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.product-price .price {
    font-size: 1.5rem;
    color: var(--accent-gold);
    text-shadow: 0 0 10px rgba(212, 165, 116, 0.3);
}

/* Hidden Category */
.product-card.hidden {
    display: none;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .categories-grid {
        grid-template-columns: 1fr;
    }

    .products-container {
        grid-template-columns: 1fr;
    }

    .premium-badge {
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 1rem;
    }

    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 0.9rem;
    }

    .logo {
        font-size: 1.2rem;
        gap: 0.3rem;
    }

    .brand-name {
        font-size: 0.9rem;
    }
}

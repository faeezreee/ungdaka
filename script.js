/**
 * Ungdaka Website - Modern Interactive JavaScript
 * Professional industrial lubricants and chemicals company website
 */

'use strict';

// ===== FORM HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const company = contactForm.querySelector('[name="company"]').value;
            const contactPerson = contactForm.querySelector('[name="contact-person"]').value;
            const email = contactForm.querySelector('[name="email"]').value;
            const phone = contactForm.querySelector('[name="phone"]').value;
            const inquiryType = contactForm.querySelector('[name="inquiry-type"]').value;
            const industry = contactForm.querySelector('[name="industry"]').value;
            const message = contactForm.querySelector('[name="message"]').value;
            
            // Format the message for WhatsApp
            const whatsappMessage = 
`*New Inquiry from Website*
Company: ${company}
Contact Person: ${contactPerson}
Email: ${email}
Phone: ${phone}
Inquiry Type: ${inquiryType}
Industry: ${industry || 'Not specified'}

Message:
${message}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Create WhatsApp URL (using proper country code for Malaysia)
            const whatsappURL = `https://wa.me/60439999966?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Quote Form Handler
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const company = quoteForm.querySelector('[name="company"]').value;
            const contactPerson = quoteForm.querySelector('[name="contact-person"]').value;
            const email = quoteForm.querySelector('[name="email"]').value;
            const phone = quoteForm.querySelector('[name="phone"]').value;
            const productCategory = quoteForm.querySelector('[name="product-category"]').value;
            const requirements = quoteForm.querySelector('[name="requirements"]').value;
            
            // Format the message for WhatsApp
            const whatsappMessage = 
`*New Quote Request from Website*
Company: ${company}
Contact Person: ${contactPerson}
Email: ${email}
Phone: ${phone}
Product Category: ${productCategory}

Requirements:
${requirements}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/60439999966?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Close modal and reset form
            const modal = document.getElementById('quote-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            quoteForm.reset();
        });
    }
});

// Replace Aerosol tab descriptions with concise application summaries
document.addEventListener('DOMContentLoaded', function(){
    try{
        const panel = document.querySelector('.tab-panel#aerosol');
        if(!panel) return;

        // Map product slug (href filename) or keyword to applications (keep 2-3 concise items)
        const apps = {
            'lube-guard-original.html': ['General maintenance', 'Loosens rust', 'Moisture displacement'],
            'lube-guard-lemon.html': ['Fresh-scent lubrication', 'Light protection', 'General use'],
            's-88-paintable.html': ['Injection mould release', 'Paintable parts', 'Plastic components'],
            's-88-non-paintable.html': ['High-release moulding', 'Non-paintable parts', 'Plastic moulds'],
            'ns-77-non-silicone-mould-release.html': ['Silicone-free moulding', 'Post-painting/soldering', 'Food packaging'],
            's-22-degreaser-mould-cleaner.html': ['Degreasing', 'Mould cleaning', 'Surface prep'],
            'sc-99-solvent-cleaner.html': ['Solvent cleaning', 'Oil/grease removal', 'Precision parts'],
            'sr-remover-silicone-residue-cleaner.html': ['Silicone residue removal', 'Mould maintenance'],
            'pro-cote.html': ['Corrosion protection', 'Storage & transport', 'Metal surfaces'],
            'pro-cote-white-protective-coating.html': ['Protective coating', 'Corrosion resistance', 'White finish'],
            'pro-shield-green-anti-corrosion.html': ['Anti-corrosion', 'Inspection marking', 'Short-term protection'],
            'pro-shield-blue-anti-corrosion.html': ['Mid-term wax coating', 'Rust prevention', 'High temp tolerance'],
            'ep-lube-ejector-pin-lubricant.html': ['Ejector pin lube', 'Precision moulds', 'Non-drip film'],
            'sg-18-high-performance-grease.html': ['Multi-purpose grease', 'Bearings', 'Water resistance'],
            'moly-lube-advanced-lubricant.html': ['Wire ropes & chains', 'Penetrating lube', 'Heavy duty'],
            'ecc-electro-contact-cleaner.html': ['Electrical contacts', 'Fast dry clean', 'Non-conductive']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = panel.querySelectorAll('.products-grid .product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const href = card.getAttribute('href') || card.dataset.href || '';
            const slug = slugFromHref(href);
            let list = apps[slug];

            if(!list){
                // Fallback: try by title keywords
                const title = (card.querySelector('.product-info h3')?.textContent || '').toLowerCase();
                if(title.includes('lube guard') && title.includes('lemon')) list = apps['lube-guard-lemon.html'];
                else if(title.includes('lube guard')) list = apps['lube-guard-original.html'];
                else if(title.includes('paintable') && title.includes('s-88')) list = apps['s-88-paintable.html'];
                else if(title.includes('non-paintable') && title.includes('s-88')) list = apps['s-88-non-paintable.html'];
                else if(title.includes('ns-77')) list = apps['ns-77-non-silicone-mould-release.html'];
                else if(title.includes('s-22')) list = apps['s-22-degreaser-mould-cleaner.html'];
                else if(title.includes('sc-99')) list = apps['sc-99-solvent-cleaner.html'];
                else if(title.includes('sr remover')) list = apps['sr-remover-silicone-residue-cleaner.html'];
                else if(title.includes('pro cote white')) list = apps['pro-cote-white-protective-coating.html'];
                else if(title.includes('pro cote')) list = apps['pro-cote.html'];
                else if(title.includes('pro shield') && title.includes('green')) list = apps['pro-shield-green-anti-corrosion.html'];
                else if(title.includes('pro shield') && title.includes('blue')) list = apps['pro-shield-blue-anti-corrosion.html'];
                else if(title.includes('ep lube')) list = apps['ep-lube-ejector-pin-lubricant.html'];
                else if(title.includes('sg-18')) list = apps['sg-18-high-performance-grease.html'];
                else if(title.includes('moly-lube')) list = apps['moly-lube-advanced-lubricant.html'];
                else if(title.includes('electro contact cleaner') || title.includes('ecc')) list = apps['ecc-electro-contact-cleaner.html'];
            }

            // Render application chips below the title; hide original paragraph if present
            const info = card.querySelector('.product-info');
            if(!info) return;
            const existing = info.querySelector('.product-apps');
            if(existing) existing.remove();

            if(Array.isArray(list) && list.length){
                // Remove previous label if exists
                const prevTitle = info.querySelector('.product-apps-title');
                if(prevTitle) prevTitle.remove();

                // Title label
                const titleEl = document.createElement('span');
                titleEl.className = 'product-apps-title';
                titleEl.textContent = 'Applications';

                // Chips row
                const wrap = document.createElement('div');
                wrap.className = 'product-apps';
                list.slice(0,3).forEach(txt => {
                    const chip = document.createElement('span');
                    chip.className = 'app-chip';
                    chip.textContent = txt;
                    wrap.appendChild(chip);
                });

                // insert after title h3
                const h3 = info.querySelector('h3');
                if(h3){
                    if(h3.nextSibling){
                        h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                        titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                    } else {
                        info.appendChild(titleEl);
                        info.appendChild(wrap);
                    }
                } else {
                    info.appendChild(titleEl);
                    info.appendChild(wrap);
                }
            }
            // Hide description paragraph if exists (CSS also hides it)
            const p = info.querySelector('p');
            if(p){ p.style.display = 'none'; }
        });
    }catch(e){ /* ignore */ }
});

// Replace Food-Safe tab descriptions with concise application chips + title
document.addEventListener('DOMContentLoaded', function(){
    try{
        const panel = document.querySelector('.tab-panel#foodgrade');
        if(!panel) return;

        const apps = {
            'protean-vhvi-hydraulic-oils.html': ['NSF H1 hydraulic systems', 'Food processing lines', 'High VI stability'],
            'protean-pao.html': ['High-temp bearings', 'Food machinery', 'Long service life'],
            'protean-chain-gear-oils.html': ['Chains & gears', 'Load carrying', 'Wear protection'],
            'protean-compressor-oils.html': ['Compressed air systems', 'Low residue', 'Food-safe'],
            'protean-vacuum-pump-oils.html': ['Vacuum sealing', 'High vacuum', 'Low vapor pressure'],
            'protean-airline-oils.html': ['Pneumatics', 'Clean air', 'Low mist'],
            'protean-white-grease.html': ['Bearings & slides', 'White NSF H1', 'General use'],
            'protean-classic-2.html': ['General purpose', 'Food packaging', 'NSF H1'],
            'protean-3h1-grease.html': ['Direct food contact', '3H/H1', 'Packaging equipment'],
            'protean-assembly-grease.html': ['Assembly & maintenance', 'Food-safe'],
            'protean-fast-dry-solvent-cleaner.html': ['Fast cleaning', 'No residue', 'Maintenance'],
            'protean-multi-lube.html': ['Multi-purpose lube', 'Food processing'],
            'protean-silicone-release.html': ['Food molds', 'Release agent'],
            'protean-wd-anti-rust-agent.html': ['Water displacement', 'Anti-rust', 'Food equipment'],
            'synthetic-ejector-pin-lubricant.html': ['Ejector pins', 'Food packaging molds', 'Precision']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = panel.querySelectorAll('.products-grid .product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const href = card.getAttribute('href') || card.dataset.href || '';
            const slug = slugFromHref(href);
            let list = apps[slug];

            if(!list){
                const title = (card.querySelector('.product-info h3')?.textContent || '').toLowerCase();
                if(title.includes('hydraulic')) list = apps['protean-vhvi-hydraulic-oils.html'];
                else if(title.includes('pao')) list = apps['protean-pao.html'];
                else if(title.includes('chain') && title.includes('gear')) list = apps['protean-chain-gear-oils.html'];
                else if(title.includes('compressor')) list = apps['protean-compressor-oils.html'];
                else if(title.includes('vacuum')) list = apps['protean-vacuum-pump-oils.html'];
                else if(title.includes('airline')) list = apps['protean-airline-oils.html'];
                else if(title.includes('white grease')) list = apps['protean-white-grease.html'];
                else if(title.includes('classic')) list = apps['protean-classic-2.html'];
                else if(title.includes('3h1')) list = apps['protean-3h1-grease.html'];
                else if(title.includes('assembly grease')) list = apps['protean-assembly-grease.html'];
                else if(title.includes('fast dry')) list = apps['protean-fast-dry-solvent-cleaner.html'];
                else if(title.includes('multi-lube')) list = apps['protean-multi-lube.html'];
                else if(title.includes('silicone release')) list = apps['protean-silicone-release.html'];
                else if(title.includes('wd')) list = apps['protean-wd-anti-rust-agent.html'];
                else if(title.includes('ejector pin')) list = apps['synthetic-ejector-pin-lubricant.html'];
            }

            const info = card.querySelector('.product-info');
            if(!info) return;
            const existing = info.querySelector('.product-apps');
            if(existing) existing.remove();
            const prevTitle = info.querySelector('.product-apps-title');
            if(prevTitle) prevTitle.remove();

            if(Array.isArray(list) && list.length){
                const titleEl = document.createElement('span');
                titleEl.className = 'product-apps-title';
                titleEl.textContent = 'Applications';

                const wrap = document.createElement('div');
                wrap.className = 'product-apps';
                list.slice(0,3).forEach(txt => {
                    const chip = document.createElement('span');
                    chip.className = 'app-chip';
                    chip.textContent = txt;
                    wrap.appendChild(chip);
                });

                const h3 = info.querySelector('h3');
                if(h3){
                    if(h3.nextSibling){
                        h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                        titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                    } else {
                        info.appendChild(titleEl);
                        info.appendChild(wrap);
                    }
                } else {
                    info.appendChild(titleEl);
                    info.appendChild(wrap);
                }
            }

            const p = info.querySelector('p');
            if(p){ p.style.display = 'none'; }
        });
    }catch(e){ /* ignore */ }
});

// Replace Accessories tab descriptions with concise application chips + title
document.addEventListener('DOMContentLoaded', function(){
    try{
        const panel = document.querySelector('.tab-panel#accessories');
        if(!panel) return;

        const apps = {
            'handheld-refractometer.html': ['Coolant concentration', 'Quick field checks', 'Portable measurement'],
            'handheld-ph-reader.html': ['pH monitoring', 'Coolants & solutions', 'Quality control'],
            'cnc-os-oil-skimmer.html': ['Tramp oil removal', 'Coolant life extension', 'CNC machines'],
            'giga-os-oil-skimmer.html': ['High-capacity skimming', 'Industrial sumps', 'Continuous duty']
            , 'chip-sludge-removal-machine.html': ['CNC & Machining', 'Coolant Recovery Systems', 'Machine Tool Maintenance']
            , 'composite-oil-water-separator.html': ['Oil Skimming', 'Coolant Management', 'Wastewater Treatment']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = panel.querySelectorAll('.products-grid .product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const href = card.getAttribute('href') || card.dataset.href || '';
            const slug = slugFromHref(href);
            let list = apps[slug];

            if(!list){
                const title = (card.querySelector('.product-info h3')?.textContent || '').toLowerCase();
                if(title.includes('refractometer')) list = apps['handheld-refractometer.html'];
                else if(title.includes('ph')) list = apps['handheld-ph-reader.html'];
                else if(title.includes('cnc-os')) list = apps['cnc-os-oil-skimmer.html'];
                else if(title.includes('giga-os')) list = apps['giga-os-oil-skimmer.html'];
            }

            const info = card.querySelector('.product-info');
            if(!info) return;
            const existing = info.querySelector('.product-apps');
            if(existing) existing.remove();
            const prevTitle = info.querySelector('.product-apps-title');
            if(prevTitle) prevTitle.remove();

            if(Array.isArray(list) && list.length){
                const titleEl = document.createElement('span');
                titleEl.className = 'product-apps-title';
                titleEl.textContent = 'Applications';

                const wrap = document.createElement('div');
                wrap.className = 'product-apps';
                list.slice(0,3).forEach(txt => {
                    const chip = document.createElement('span');
                    chip.className = 'app-chip';
                    chip.textContent = txt;
                    wrap.appendChild(chip);
                });

                const h3 = info.querySelector('h3');
                if(h3){
                    if(h3.nextSibling){
                        h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                        titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                    } else {
                        info.appendChild(titleEl);
                        info.appendChild(wrap);
                    }
                } else {
                    info.appendChild(titleEl);
                    info.appendChild(wrap);
                }
            }

            const p = info.querySelector('p');
            if(p){ p.style.display = 'none'; }
        });
    }catch(e){ /* ignore */ }
});

// Replace Metal Working tab descriptions with concise application chips + title
document.addEventListener('DOMContentLoaded', function(){
    try{
        const panel = document.querySelector('.tab-panel#metalworking');
        if(!panel) return;

        const apps = {
            'neat-cutting-oils.html': ['Severe machining', 'Surface finish', 'Tool life'],
            'stamping-oils.html': ['Stamping/forming', 'Die protection', 'Clean parts'],
            'deep-drawing-oils.html': ['Deep drawing', 'Extreme pressure', 'Surface protection'],
            'edm-synthetic-oils.html': ['EDM dielectric', 'Precision cutting', 'High purity'],
            'tapping-fluids.html': ['Thread quality', 'Cooling & lubrication', 'Tool life'],
            'water-soluble-cutting-coolants.html': ['Cooling & lubrication', 'Corrosion protection', 'Versatile machining'],
            'anti-rust-series.html': ['Long-term protection', 'Multi-metal', 'Storage & transit']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = panel.querySelectorAll('.products-grid .product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const href = card.getAttribute('href') || card.dataset.href || '';
            const slug = slugFromHref(href);
            let list = apps[slug];

            if(!list){
                const title = (card.querySelector('.product-info h3')?.textContent || '').toLowerCase();
                if(title.includes('neat cutting')) list = apps['neat-cutting-oils.html'];
                else if(title.includes('stamping')) list = apps['stamping-oils.html'];
                else if(title.includes('deep drawing')) list = apps['deep-drawing-oils.html'];
                else if(title.includes('edm')) list = apps['edm-synthetic-oils.html'];
                else if(title.includes('tapping')) list = apps['tapping-fluids.html'];
                else if(title.includes('water soluble')) list = apps['water-soluble-cutting-coolants.html'];
                else if(title.includes('anti-rust')) list = apps['anti-rust-series.html'];
            }

            const info = card.querySelector('.product-info');
            if(!info) return;
            const existing = info.querySelector('.product-apps');
            if(existing) existing.remove();
            const prevTitle = info.querySelector('.product-apps-title');
            if(prevTitle) prevTitle.remove();

            if(Array.isArray(list) && list.length){
                const titleEl = document.createElement('span');
                titleEl.className = 'product-apps-title';
                titleEl.textContent = 'Applications';

                const wrap = document.createElement('div');
                wrap.className = 'product-apps';
                list.slice(0,3).forEach(txt => {
                    const chip = document.createElement('span');
                    chip.className = 'app-chip';
                    chip.textContent = txt;
                    wrap.appendChild(chip);
                });

                const h3 = info.querySelector('h3');
                if(h3){
                    if(h3.nextSibling){
                        h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                        titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                    } else {
                        info.appendChild(titleEl);
                        info.appendChild(wrap);
                    }
                } else {
                    info.appendChild(titleEl);
                    info.appendChild(wrap);
                }
            }

            const p = info.querySelector('p');
            if(p){ p.style.display = 'none'; }
        });
    }catch(e){ /* ignore */ }
});

// Replace Maintenance tab descriptions with concise application chips + title
document.addEventListener('DOMContentLoaded', function(){
    try{
        const panel = document.querySelector('.tab-panel#maintenance');
        if(!panel) return;

        const apps = {
            'cooling-tower-water-treatment.html': ['Scale control', 'Corrosion inhibition', 'Biocide treatment'],
            'water-base-anti-rust-chemical.html': ['Water-based rust prevention', 'In-process protection'],
            'rust-remover-chemical.html': ['Rust removal', 'Surface prep'],
            'industrial-paint-remover.html': ['Coating removal', 'Surface stripping'],
            'air-con-coil-cleaner.html': ['HVAC coil cleaning', 'Efficiency restore'],
            'oil-degreaser.html': ['Heavy oil removal', 'Machine cleaning'],
            'waterless-hand-scrubber.html': ['Hand cleaning', 'Grease & grime removal'],
            'sanitizer.html': ['Workplace sanitation', 'Hygiene maintenance'],
            'spray-booth-compound.html': ['Booth protection', 'Easy overspray cleanup']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = panel.querySelectorAll('.products-grid .product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const href = card.getAttribute('href') || card.dataset.href || '';
            const slug = slugFromHref(href);
            let list = apps[slug];

            if(!list){
                const title = (card.querySelector('.product-info h3')?.textContent || '').toLowerCase();
                if(title.includes('cooling tower')) list = apps['cooling-tower-water-treatment.html'];
                else if(title.includes('anti-rust')) list = apps['water-base-anti-rust-chemical.html'];
                else if(title.includes('rust remover')) list = apps['rust-remover-chemical.html'];
                else if(title.includes('paint remover')) list = apps['industrial-paint-remover.html'];
                else if(title.includes('coil cleaner')) list = apps['air-con-coil-cleaner.html'];
                else if(title.includes('degreaser')) list = apps['oil-degreaser.html'];
                else if(title.includes('hand scrubber') || title.includes('waterless')) list = apps['waterless-hand-scrubber.html'];
                else if(title.includes('sanitizer')) list = apps['sanitizer.html'];
                else if(title.includes('spray booth')) list = apps['spray-booth-compound.html'];
            }

            const info = card.querySelector('.product-info');
            if(!info) return;
            const existing = info.querySelector('.product-apps');
            if(existing) existing.remove();
            const prevTitle = info.querySelector('.product-apps-title');
            if(prevTitle) prevTitle.remove();

            if(Array.isArray(list) && list.length){
                const titleEl = document.createElement('span');
                titleEl.className = 'product-apps-title';
                titleEl.textContent = 'Applications';

                const wrap = document.createElement('div');
                wrap.className = 'product-apps';
                list.slice(0,3).forEach(txt => {
                    const chip = document.createElement('span');
                    chip.className = 'app-chip';
                    chip.textContent = txt;
                    wrap.appendChild(chip);
                });

                const h3 = info.querySelector('h3');
                if(h3){
                    if(h3.nextSibling){
                        h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                        titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                    } else {
                        info.appendChild(titleEl);
                        info.appendChild(wrap);
                    }
                } else {
                    info.appendChild(titleEl);
                    info.appendChild(wrap);
                }
            }

            const p = info.querySelector('p');
            if(p){ p.style.display = 'none'; }
        });
    }catch(e){ /* ignore */ }
});
        // Group product cards by identical image within each grid and show one image with a list of product links
        try {
    function groupCardsWithSameImage(grid) {
                const cards = Array.from(grid.querySelectorAll('.product-card'))
                    // exclude already grouped
                    .filter(c => !c.classList.contains('product-card-grouped'));

                if (cards.length < 2) return;

                // group by exact image src
                const groups = new Map();
                cards.forEach(card => {
                    // Support both .product-image and .product-image-container wrappers
                    const img = card.querySelector('.product-image img, .product-image-container img, img');
                    let src = (img && img.getAttribute('src')) ? img.getAttribute('src').trim() : '';
                    if (!src) return;
                    // Normalize: drop query/hash, remove leading slashes, trim spaces, lower-case
                    try {
                        src = src.split('?')[0].split('#')[0].trim();
                        src = src.replace(/^\/+/, '');
                        src = src.toLowerCase();
                    } catch(e) { /* ignore */ }
                    if (!groups.has(src)) groups.set(src, []);
                    groups.get(src).push(card);
                });

                groups.forEach((list, src) => {
                    if (!list || list.length <= 1) return; // only group duplicates

                    // Build a new grouped card using the first card's image block
                    const first = list[0];
                    const grouped = document.createElement('div');
                    grouped.className = 'product-card product-card-grouped';

                    // Preserve categories: if all originals share same category, set data-category;
                    // otherwise store a comma-separated list in data-categories for multi-match filtering
                    try {
                        const catSet = new Set(
                            list.map(c => (c.dataset && c.dataset.category) || '')
                                .filter(Boolean)
                        );
                        if (catSet.size === 1) {
                            const only = Array.from(catSet)[0];
                            if (only) grouped.dataset.category = only;
                        } else if (catSet.size > 1) {
                            grouped.dataset.categories = Array.from(catSet).join(',');
                        }
                    } catch (e) { /* ignore */ }

                    // Clone the image section to keep inline sizing (support both wrappers)
                    const imgWrap = first.querySelector('.product-image, .product-image-container');
                    if (imgWrap) {
                        grouped.appendChild(imgWrap.cloneNode(true));
                    } else {
                        // fallback: create a simple wrapper from the first image
                        const fallbackImg = first.querySelector('img');
                        if (fallbackImg) {
                            const w = document.createElement('div');
                            w.className = 'product-image';
                            const clone = fallbackImg.cloneNode(true);
                            w.appendChild(clone);
                            grouped.appendChild(w);
                        }
                    }

                    // Build the info section with a list of links
                    const info = document.createElement('div');
                    info.className = 'product-info';

                    // Title removed (Products count not shown in grouped info)

                    const listWrap = document.createElement('div');
                    listWrap.className = 'product-list';

                    list.forEach(card => {
                        const item = document.createElement('div');
                        item.className = 'product-item';

                        // Link and toggle line
                        const line = document.createElement('div');
                        line.className = 'product-line';

                        // Create product title element (h3) with a link or span inside — keep the title as heading like Lube Guard
                        const srcH3 = card.querySelector('.product-info h3');
                        const label = srcH3 ? srcH3.textContent.trim() : (card.getAttribute('aria-label') || 'View');
                        const href = card.getAttribute('href') || card.dataset.href || '';
                        const titleEl = document.createElement('h3');
                        titleEl.className = 'product-index-title';
                        // Render title as a non-clickable element (span) to match Lube Guard UI
                        const innerLabel = document.createElement('span');
                        innerLabel.className = 'product-link';
                        // preserve original href as a data attribute in case it's needed elsewhere
                        if (href && href !== '#') {
                            innerLabel.dataset.href = href;
                        }
                        innerLabel.textContent = label;
                        titleEl.appendChild(innerLabel);

                        // Description removed: do not include product description or toggle in the index

                        line.appendChild(titleEl);
                        item.appendChild(line);

                        // Try to insert up to 3 application chips under the index item.
                        // Prefer existing rendered chips (.product-apps .app-chip) cloned from the source card.
                        (function insertIndexChipsFromCard(srcCard, targetItem){
                            try{
                                // Look for already-rendered chips inside the card
                                const existingChips = srcCard.querySelectorAll('.product-apps .app-chip');
                                let apps = [];
                                if (existingChips && existingChips.length) {
                                    existingChips.forEach((c,i)=>{ if(i<3) apps.push(c.textContent.trim()); });
                                } else {
                                    // Fallback: parse "Application:" text blocks
                                    const appEl = srcCard.querySelector('.product-application, .product-application-enhanced');
                                    if (appEl) {
                                        const txt = appEl.textContent || '';
                                        const parts = txt.split(/application\s*:/i);
                                        if (parts[1]) {
                                            apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean).slice(0,3);
                                        }
                                    }
                                }

                                if (apps.length) {
                                    const titleEl = document.createElement('span');
                                    titleEl.className = 'product-apps-title';
                                    titleEl.textContent = 'Applications';

                                    const wrap = document.createElement('div');
                                    wrap.className = 'product-apps';
                                    apps.forEach(txt => {
                                        const chip = document.createElement('span');
                                        chip.className = 'app-chip';
                                        chip.textContent = txt;
                                        wrap.appendChild(chip);
                                    });
                                    // Insert title then chips before the description paragraph if present, otherwise append
                                    const pdEl = targetItem.querySelector('.product-desc');
                                    if (pdEl) {
                                        pdEl.parentNode.insertBefore(titleEl, pdEl);
                                        pdEl.parentNode.insertBefore(wrap, pdEl);
                                    } else {
                                        targetItem.appendChild(titleEl);
                                        targetItem.appendChild(wrap);
                                    }
                                }
                            }catch(e){ /* ignore */ }
                        })(card, item);

                        // Descriptions and CTAs removed per design — index now shows only title and application chips
                        listWrap.appendChild(item);
                    });

                    info.appendChild(listWrap);
                    grouped.appendChild(info);

                    // Insert grouped card before the first occurrence, then remove all originals
                    grid.insertBefore(grouped, first);
                    list.forEach(card => card.remove());
                });
            }

            const groupingGrids = document.querySelectorAll('.products-grid, .products-grid-enhanced');
            groupingGrids.forEach(grid => {
                groupCardsWithSameImage(grid);
                // Move grouped items to the top to surface consolidated products
                try{
                    const grouped = Array.from(grid.querySelectorAll('.product-card-grouped'));
                    if(grouped.length){
                        grouped.reverse().forEach(node => {
                            grid.insertBefore(node, grid.firstElementChild);
                        });
                    }
                }catch(e){ /* ignore */ }
            });

            // After grouping, mark titles that share the same image within each grid
            function markDuplicateImageTitles(grid){
                try{
                    const cards = Array.from(grid.querySelectorAll('.product-card'));
                    if (cards.length < 2) return;
                    const bySrc = new Map();
                    cards.forEach(card => {
                        const img = card.querySelector('.product-image img, .product-image-container img, img');
                        let src = img ? (img.getAttribute('src')||'').trim() : '';
                        if (src) {
                            try {
                                src = src.split('?')[0].split('#')[0].trim();
                                src = src.replace(/^\/+/, '');
                                src = src.toLowerCase();
                            } catch(e) { /* ignore */ }
                        }
                        if (!src) return;
                        if (!bySrc.has(src)) bySrc.set(src, []);
                        bySrc.get(src).push(card);
                    });
                    bySrc.forEach((list, src) => {
                        if (!list || list.length <= 1) return;
                        list.forEach(card => {
                            const h3 = card.querySelector('.product-info h3');
                            if (h3) h3.classList.add('duplicate-image-title');
                            // Some titles are anchors in grouped cards; mark their product links as well
                            const a = card.querySelector('.product-info a.product-link, .product-info h3 a');
                            if (a) a.classList.add('duplicate-image-title');
                        });
                    });
                } catch(e) { /* ignore */ }
            }

            // Mark duplicates in all common grid containers (without grouping side-effects)
            const markGrids = document.querySelectorAll('.products-grid, .products-grid-enhanced, .related-products-grid, .related-products-container');
            markGrids.forEach(markDuplicateImageTitles);

            // Additionally, in grouped cards, all items came from duplicate images — mark their links
            document.querySelectorAll('.product-card-grouped .product-list .product-link')
                .forEach(a => a.classList.add('duplicate-image-title'));
        } catch (e) {
            // no-op
        }

// Transparent overlay uses an animated GIF now; no autoplay handling needed.

// Dynamically load product-animations on product detail pages to avoid including
// the script on listing pages. Product pages use <body class="product-page">.
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (document.body && document.body.classList.contains('product-page')) {
            const s = document.createElement('script');
            s.src = '../product-animations.js';
            s.async = false;
            document.body.appendChild(s);
        }
    } catch (e) {
        // ignore
    }
});

// ===== Stamping page: render Applications chips and compact layout =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        // Run only on stamping-products.html
        const isStampingPage = /stamping-products\.html(?:$|[?#])/i.test(window.location.pathname) || document.title.toLowerCase().includes('stamping');
        if(!isStampingPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        // Helper to insert title + chips under h3
        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            // Remove existing
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();

            const titleEl = document.createElement('span');
            titleEl.className = 'product-apps-title';
            titleEl.textContent = 'Applications';

            const wrap = document.createElement('div');
            wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt => {
                const chip = document.createElement('span');
                chip.className = 'app-chip';
                chip.textContent = txt.trim();
                wrap.appendChild(chip);
            });

            const h3 = infoEl.querySelector('h3');
            if(h3){
                if(h3.nextSibling){
                    h3.parentNode.insertBefore(titleEl, h3.nextSibling);
                    titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);
                } else {
                    infoEl.appendChild(titleEl);
                    infoEl.appendChild(wrap);
                }
            } else {
                infoEl.appendChild(titleEl);
                infoEl.appendChild(wrap);
            }
        }

        // Fallback map if product-application text is missing
        const fallbackApps = {
            'hydraulic-awx-series.html': ['Press hydraulics', 'Stable AW performance', 'Wide ISO grades'],
            'grease.html': ['Bearings & slides', 'General lubrication', 'Shock loads'],
            'stamping-oils.html': ['Stamping/forming', 'Die protection', 'Clean finish'],
            'hydrocarbon-solvents.html': ['Die cleaning', 'Degreasing', 'Surface prep'],
            'industrial-gear-series.html': ['Gearboxes', 'Transmissions', 'High load'],
            'lube-guard-original.html': ['Quick maintenance', 'Loosen rust', 'Moisture displacement'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Shop use']
        };

        function slugFromHref(href){
            try{
                const url = href.split('?')[0].split('#')[0];
                const parts = url.split('/');
                return parts[parts.length-1].toLowerCase();
            }catch(e){ return ''; }
        }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info');
            if(!info) return;

            // Try to parse existing product-application block
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                // After 'Application:' split by comma
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){
                    apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean);
                }
            }

            if(!apps.length){
                const href = card.getAttribute('href') || card.dataset.href || '';
                const slug = slugFromHref(href);
                apps = fallbackApps[slug] || [];
            }

            if(apps.length){ insertChips(info, apps); }

            // hide verbose blocks (CSS also hides, but ensure inline for safety)
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Automotive & Transportation page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isAutoPage = /automotive-transportation-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('automotive'));
        if(!isAutoPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            's-88-paintable.html': ['Automotive moulding', 'Clean release', 'Plastic parts'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance', 'Loosen rust'],
            'sg-18-high-performance-grease.html': ['Bearings', 'Suspension', 'Moving parts'],
            'moly-lube-advanced-lubricant.html': ['High load points', 'Chains & cables', 'Extreme conditions'],
            's-22-degreaser-mould-cleaner.html': ['Parts degreasing', 'Maintenance', 'Residue-free clean'],
            'belt-dressing-industrial-lubricant.html': ['Drive belts', 'Anti-slip', 'Conditioning'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Shop use']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-content, .product-info');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = slugFromHref(href); apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Plastic Injection page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isPIPage = /plastic-injection-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('plastic injection'));
        if(!isPIPage) return;

        const grid = document.querySelector('.products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            's-88-paintable.html': ['Paintable molding', 'Clean release', 'Plastic components'],
            's-88-non-paintable.html': ['High-release molding', 'Non-paintable parts', 'Plastic molds'],
            'ns-77-non-silicone-mould-release.html': ['Silicone-free moulding', 'Food/medical packaging', 'Post-processing safe'],
            'pro-cote-protective-coating.html': ['Mold protection', 'Equipment coating'],
            'pro-cote-white-protective-coating.html': ['Protective coating', 'Corrosion resistance'],
            'pro-shield-green-anti-corrosion.html': ['Anti-corrosion', 'High temp tolerance'],
            'pro-shield-blue-anti-corrosion.html': ['Wax film', 'Rust prevention', 'Storage protection'],
            's-22-degreaser-mould-cleaner.html': ['Mould cleaning', 'Degreasing'],
            'sc-99-solvent-cleaner.html': ['Precision cleaning', 'Oil/grease removal'],
            'ep-lube-ejector-pin-lubricant.html': ['Ejector pins', 'Precision slides'],
            'sr-remover-silicone-residue-cleaner.html': ['Silicone residue removal', 'Mould maintenance'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance'],
            'protean-silicone-release.html': ['Food-contact moulds', 'Release agent'],
            'protean-fast-dry-solvent-cleaner.html': ['Fast cleaning', 'No residue'],
            'protean-white-grease.html': ['Food packaging lines', 'Bearings & slides'],
            'hydraulic-awx-series.html': ['Hydraulic systems', 'Injection machines'],
            'cooling-tower-water-treatment.html': ['Scale control', 'Corrosion inhibition'],
            'heat-transfer-oils.html': ['Heat transfer systems', 'Thermal stability']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = slugFromHref(href); apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Machining & Engineering page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isMachiningPage = /machining-engineering-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('machining'));
        if(!isMachiningPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'hydraulic-awx-series.html': ['CNC hydraulics', 'Stable AW performance', 'Multiple ISO grades'],
            'slideway-oil.html': ['Slideways & guides', 'Stick-slip control', 'Precision motion'],
            'water-soluble-cutting-coolants.html': ['Cooling & lubrication', 'Machining operations', 'Corrosion protection'],
            'neat-cutting-oils.html': ['Heavy-duty cutting', 'Threading/turning', 'Tool life'],
            'anti-rust-series.html': ['Parts protection', 'Inter-process', 'Rust prevention'],
            'hydrocarbon-solvents.html': ['Precision degreasing', 'Surface prep', 'Fast evaporation'],
            'edm-synthetic-oils.html': ['EDM dielectric', 'Wire/Die sink', 'High purity'],
            'sg-18-high-performance-grease.html': ['Loosen seized parts', 'Maintenance'],
            'supertap-cutting-lubricant.html': ['Tapping/threading', 'Extreme pressure', 'Clean threads'],
            'tapping-fluids.html': ['Tapping', 'Thread cutting', 'Lubrication'],
            'rust-remover-chemical.html': ['Rust removal', 'Tool restoration', 'Surface clean'],
            'spindle-oil.html': ['High-speed spindles', 'Low friction', 'Precision bearings'],
            'giga-os-oil-skimmer.html': ['Coolant skimming', 'Oil removal', 'System maintenance'],
            'cnc-os-oil-skimmer.html': ['CNC coolant systems', 'Tramp oil removal', 'Compact install'],
            'handheld-ph-reader.html': ['Coolant pH', 'Quality control', 'Field checks'],
            'lube-guard-original.html': ['General lubrication', 'Quick maintenance', 'Loosen rust'],
            'handheld-refractometer.html': ['Coolant concentration', 'Portable checks', 'QA'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Workshop']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = slugFromHref(href); apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Construction & Cement page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isCCPage = /construction-cement-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('construction & cement'));
        if(!isCCPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'heavy-duty-grease.html': ['High-load bearings', 'Construction machinery', 'Extreme pressure'],
            'industrial-gear-series.html': ['Gearboxes', 'Transmissions', 'Heavy equipment'],
            'moly-lube-advanced-lubricant.html': ['Pins & bushings', 'Chains & cables', 'High temp/pressure'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Workshop'],
            'tygris-copper.html': ['Threads & bolts', 'Anti-seize', 'High temperature']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = slugFromHref(href); apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Marine & Offshore page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isMarinePage = /marine-offshore-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('marine & offshore'));
        if(!isMarinePage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'sg-18-high-performance-grease.html': ['Marine bearings', 'Water resistance', 'General lubrication'],
            'sc-99-solvent-cleaner.html': ['Solvent cleaning', 'Oil/grease removal', 'Inspection prep'],
            's-88-silicone-mould-release.html': ['Welding prep', 'Spatter prevention', 'Surface protection'],
            'moly-lube-advanced-lubricant.html': ['Chains & cables', 'Pins & bushings', 'Extreme conditions'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance', 'Loosen rust'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Workshop'],
            'tygris-copper.html': ['Threads/bolts', 'Anti-seize', 'High temperature']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = slugFromHref(href); apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Quarries page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isQuarriesPage = /quarries-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('quarries'));
        if(!isQuarriesPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'hydraulic-awx-series.html': ['Excavators & loaders', 'Crushers hydraulics', 'AW protection'],
            'heavy-duty-grease.html': ['Bearings & pins', 'EP loads', 'Harsh conditions'],
            'industrial-gear-series.html': ['Gearboxes', 'Reduction drives', 'Thermal stability'],
            'moly-lube-advanced-lubricant.html': ['Chains & cables', 'High load', 'Moving parts'],
            '__title__:open gear grease': ['Open gears', 'Crusher drives', 'Conveyors'],
            '__title__:tygris moly dry film spray': ['Dry film', 'Dusty conditions', 'Slides & chains'],
            'waterless-hand-scrubber.html': ['Maintenance cleaning', 'Degreasing', 'Workshop']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){
                const href = card.getAttribute('href') || card.dataset.href || '';
                const slug = href ? slugFromHref(href) : '';
                if(slug && fallbackApps[slug]){ apps = fallbackApps[slug]; }
                else {
                    const title = (info.querySelector('h3')?.textContent || '').toLowerCase().trim();
                    const key = `__title__:${title}`;
                    apps = fallbackApps[key] || [];
                }
            }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Semiconductor & Disk Drive page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isSemiPage = /semiconductor-disk-drive-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('semiconductor'));
        if(!isSemiPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'ecc-electro-contact-cleaner.html': ['Electronic contacts', 'Precision cleaning', 'Residue-free'],
            'sc-99-solvent-cleaner.html': ['Precision degreasing', 'Fast evaporation', 'Residue-free'],
            'lube-guard-original.html': ['General lubrication', 'Non-staining', 'Precision mechanisms'],
            'waterless-hand-scrubber.html': ['Component cleaning', 'Detailed maintenance'],
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = href ? slugFromHref(href) : ''; apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});
// ===== Oil & Gas page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isOilGasPage = /oil-gas-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('oil & gas'));
        if(!isOilGasPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'moly-lube-advanced-lubricant.html': ['Chains & cables', 'Heavy machinery', 'Extreme pressure'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance', 'Moisture displacement'],
            'sr-remover-silicone-residue-cleaner.html': ['Hands cleaning', 'Grease & grime', 'Workshop'],
            // Title-key fallbacks (used when no href/slug)
            '__title__:tygris moly dry film spray': ['Dry film lubrication', 'High temperature', 'Threaded connections'],
            '__title__:tygris copper': ['Anti-seize for bolts', 'High temperature', 'Threaded joints']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;

            // Prefer explicit Application: text if present
            let apps = [];
            const appEl = info.querySelector('.product-application, .product-application-enhanced');
            if(appEl){
                const txt = appEl.textContent || '';
                const parts = txt.split(/application\s*:/i);
                if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); }
            }

            if(!apps.length){
                const href = card.getAttribute('href') || card.dataset.href || '';
                const slug = href ? slugFromHref(href) : '';
                if(slug && fallbackApps[slug]){
                    apps = fallbackApps[slug] || [];
                } else {
                    const title = (info.querySelector('h3')?.textContent || '').toLowerCase().trim();
                    if(title){
                        const key = `__title__:${title}`;
                        apps = fallbackApps[key] || [];
                    }
                }
            }

            if(apps.length){ insertChips(info, apps); }

            // Hide verbose blocks (CSS also hides them)
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application, .product-application-enhanced'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Food, Beverage & Pharmaceutical page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isFoodPage = /food-beverage-pharmaceutical-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('food, beverage'));
        if(!isFoodPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'protean-vhvi-hydraulic-oils.html': ['NSF H1 hydraulics', 'Processing lines', 'High VI stability'],
            'protean-pao.html': ['High-temp bearings', 'Food machinery', 'Long service life'],
            'protean-chain-gear-oils.html': ['Chains & gears', 'Load carrying', 'Wear protection'],
            'protean-compressor-oils.html': ['Air compressors', 'Low residue', 'Food-safe'],
            'protean-vacuum-pump-oils.html': ['Vacuum sealing', 'High vacuum', 'Low vapor pressure'],
            'protean-airline-oils.html': ['Pneumatics', 'Clean air', 'Low mist'],
            'protean-white-grease.html': ['Bearings & slides', 'White NSF H1', 'General use'],
            'protean-classic-2.html': ['General purpose', 'Food packaging', 'NSF H1'],
            'protean-3h1-grease.html': ['Direct food contact', '3H/H1', 'Packaging equipment'],
            'protean-assembly-grease.html': ['Assembly & maintenance', 'Food-safe'],
            'protean-als-plus.html': ['Auto lube systems', 'Food processing'],
            'protean-multi-lube.html': ['Multi-purpose lube', 'Food processing'],
            'protean-wd-anti-rust-agent.html': ['Water displacement', 'Anti-rust', 'Food equipment'],
            'protean-silicone-release.html': ['Food molds', 'Release agent'],
            'protean-fast-dry-solvent-cleaner.html': ['Fast cleaning', 'No residue', 'Maintenance'],
            'synthetic-ejector-pin-lubricant.html': ['Ejector pins', 'Packaging molds', 'Precision']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = href ? slugFromHref(href) : ''; apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Rubber & Latex page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isRubberPage = /rubber-latex-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('rubber & latex'));
        if(!isRubberPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'protean-chain-gear-oils.html': ['Conveyors & chains', 'Gearboxes', 'Load carrying'],
            'hydraulic-awx-series.html': ['Hydraulic presses', 'AW protection', 'Wide ISO grades'],
            'rubber-latex-remover-chemicals.html': ['Mould cleaning', 'Residue removal', 'Line maintenance'],
            'hydrocarbon-solvents.html': ['Solvent cleaning', 'Formulation aid', 'Extraction'],
            'lube-guard-original.html': ['General lubrication', 'Anti-seize', 'Maintenance'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime', 'Workshop']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = href ? slugFromHref(href) : ''; apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Printing & Paper page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isPrintPage = /printing-paper-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('printing & paper'));
        if(!isPrintPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'hydraulic-awx-series.html': ['Press hydraulics', 'Stable AW performance', 'Multiple ISO grades'],
            'lubricating-oils.html': ['General lubrication', 'Machinery maintenance'],
            'industrial-gear-series.html': ['Gearboxes', 'Transmissions', 'High load'],
            'lube-guard-original.html': ['General lubrication', 'Maintenance'],
            's-88-paintable.html': ['Paper moulding', 'Release agent'],
            'ns-77-non-silicone-mould-release.html': ['Non-silicone release', 'Eco-friendly processes'],
            'waterless-hand-scrubber.html': ['Equipment cleaning', 'Degreasing']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = href ? slugFromHref(href) : ''; apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== Workshops (Automotive) page: render Applications chips =====
document.addEventListener('DOMContentLoaded', function(){
    try{
        const isWorkshopsPage = /workshops-automotive-products\.html(?:$|[?#])/i.test(window.location.pathname) || (document.title && document.title.toLowerCase().includes('workshops - automotive'));
        if(!isWorkshopsPage) return;

        const grid = document.querySelector('.products-section-enhanced .products-grid-enhanced');
        if(!grid) return;

        function insertChips(infoEl, items){
            if(!infoEl || !Array.isArray(items) || !items.length) return;
            const prev = infoEl.querySelector('.product-apps'); if(prev) prev.remove();
            const prevT = infoEl.querySelector('.product-apps-title'); if(prevT) prevT.remove();
            const titleEl = document.createElement('span'); titleEl.className = 'product-apps-title'; titleEl.textContent = 'Applications';
            const wrap = document.createElement('div'); wrap.className = 'product-apps';
            items.slice(0,3).forEach(txt=>{ const chip=document.createElement('span'); chip.className='app-chip'; chip.textContent=txt.trim(); wrap.appendChild(chip); });
            const h3 = infoEl.querySelector('h3');
            if(h3){ if(h3.nextSibling){ h3.parentNode.insertBefore(titleEl, h3.nextSibling); titleEl.parentNode.insertBefore(wrap, titleEl.nextSibling);} else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap);} }
            else { infoEl.appendChild(titleEl); infoEl.appendChild(wrap); }
        }

        const fallbackApps = {
            'sc-99-solvent-cleaner.html': ['Parts cleaning', 'Degreasing', 'Surface prep'],
            'moly-lube-advanced-lubricant.html': ['High-stress components', 'Chains & cables', 'Extreme pressure'],
            'lube-guard-original.html': ['General lubrication', 'Workshop maintenance'],
            'sg-18-high-performance-grease.html': ['Bearings', 'Chains & cables', 'Non-drip'],
            'waterless-hand-scrubber.html': ['Hands cleaning', 'Grease & grime']
        };

        function slugFromHref(href){ try{ const url = href.split('?')[0].split('#')[0]; const parts = url.split('/'); return parts[parts.length-1].toLowerCase(); }catch(e){ return ''; } }

    const cards = grid.querySelectorAll('.product-card:not(.product-card-grouped)');
        cards.forEach(card => {
            const info = card.querySelector('.product-info, .product-content');
            if(!info) return;
            let apps = [];
            const appEl = info.querySelector('.product-application');
            if(appEl){ const txt = appEl.textContent || ''; const parts = txt.split(/application\s*:/i); if(parts[1]){ apps = parts[1].split(',').map(s=>s.trim()).filter(Boolean); } }
            if(!apps.length){ const href = card.getAttribute('href') || card.dataset.href || ''; const slug = href ? slugFromHref(href) : ''; apps = fallbackApps[slug] || []; }
            if(apps.length){ insertChips(info, apps); }
            const p = info.querySelector('p'); if(p) p.style.display = 'none';
            const feat = info.querySelector('.product-features, .product-features-enhanced'); if(feat) feat.style.display = 'none';
            const appBlock = info.querySelector('.product-application'); if(appBlock) appBlock.style.display = 'none';
        });
    }catch(e){ /* ignore */ }
});

// ===== UTILITY FUNCTIONS =====
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    scrollToElement(element, offset = 100) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// ===== PRODUCT CATEGORY FILTER / GROUPING (shared initializer) =====
// Usage: window.initProductCategoryFilter(options)
// options: { gridSelector, barSelector, categoryMap, moveLubeGuardHref }
window.initProductCategoryFilter = function initProductCategoryFilter(options = {}){
    try{
        const cfg = Object.assign({
            gridSelector: '.products-grid-enhanced',
            barSelector: '#product-category-bar',
            // default ordered categories (slug,label)
            categoryMap: [
                ['aerosol-products','Aerosol Products'],
                ['industrial-lubricants','Industrial Lubricants'],
                ['industrial-grease','Industrial Grease'],
                ['maintenance-repair','Maintenance Chemicals'],
                ['metal-working','Metal Working'],
                ['accessories','Accessories'],
                ['food-grade-products','Food-Safe Products']
            ],
            moveLubeGuardHref: 'products/lube-guard-original.html',
            // if true, order the 'All' view by category order from categoryMap
            orderAllByCategory: false
        }, options || {});

        const grid = document.querySelector(cfg.gridSelector);
        if(!grid) return;

        // product card selector inside grid
        const products = Array.from(grid.querySelectorAll('.product-card, .product-card-enhanced'));
        // Build a set of present categories from both data-category and data-categories
        const present = new Set();
        products.forEach(p => {
            const single = p.dataset && p.dataset.category;
            if (single) present.add(single);
            const multi = p.dataset && p.dataset.categories;
            if (multi) multi.split(',').map(s => s.trim()).filter(Boolean).forEach(cat => present.add(cat));
        });
        const bar = document.querySelector(cfg.barSelector);

        // Helper to move grouped cards to the top (keeps current relative order among them)
        function moveGroupedToTop(){
            try{
                const grouped = Array.from(grid.querySelectorAll('.product-card-grouped'));
                if(grouped.length){
                    grouped.reverse().forEach(node => {
                        if(grid.firstElementChild !== node){ grid.insertBefore(node, grid.firstElementChild); }
                    });
                }
            }catch(e){ /* ignore */ }
        }

        // --- image grouping helper (fallbacks to filename heuristics) ---
        function imageGroupKey(card){
            const img = card.querySelector('img'); if(!img) return 'other';
            const src = (img.getAttribute('src')||'').toLowerCase();
            if(src.includes('drum')||src.includes('pail')||src.includes('bucket')||src.includes('drumandpail')) return 'drum-pail';
            if(src.includes('lube')||src.includes('lubeguard')||src.includes('guard')||src.includes('aerosol')||src.includes('spray')||src.includes('can')) return 'aerosol';
            if(src.includes('superscrub')||src.includes('scrub')||src.includes('hand')) return 'scrubber';
            if(src.includes('grease')||src.includes('sg-18')) return 'grease';
            return 'other';
        }

        // reorder products by image group preserving first-seen order
        (function reorderByImageType(){
            const list = Array.from(grid.querySelectorAll('.product-card, .product-card-enhanced'));
            const groups = {};
            const order = [];
            list.forEach(card=>{ const k = imageGroupKey(card); if(!groups[k]) groups[k]=[]; groups[k].push(card); if(!order.includes(k)) order.push(k); });
            order.forEach(k=> groups[k].forEach(card=> grid.appendChild(card)));
            // After image-type reorder, surface grouped duplicate-image cards to the top
            moveGroupedToTop();
        })();

        // reorder by category using categoryMap order (optional, for 'All' view)
        function reorderByCategory(){
            try{
                const order = cfg.categoryMap.map(([slug])=>slug);
                const buckets = new Map();
                order.forEach(slug=> buckets.set(slug, []));
                const others = [];
                const list = Array.from(grid.querySelectorAll('.product-card, .product-card-enhanced'));
                list.forEach(card=>{
                    const cat = card.dataset && card.dataset.category;
                    if(cat && buckets.has(cat)){
                        buckets.get(cat).push(card);
                    } else {
                        others.push(card);
                    }
                });
                // append in category order, preserving original order inside each bucket
                order.forEach(slug=>{
                    const arr = buckets.get(slug) || [];
                    arr.forEach(card=> grid.appendChild(card));
                });
                // append any remaining items
                others.forEach(card=> grid.appendChild(card));
                // After category reorder, surface grouped duplicate-image cards to the top
                moveGroupedToTop();
            }catch(e){ /* ignore */ }
        }

        // move LUBE GUARD to top if present (configurable href)
        (function moveLubeGuardFirst(){
            try{
                const sel = `a[href="${cfg.moveLubeGuardHref}"]`;
                const lg = grid.querySelector(sel);
                if(lg && grid.firstElementChild !== lg){ grid.insertBefore(lg, grid.firstElementChild); }
            }catch(e){}
        })();

        // If enabled, enforce category ordering for the initial 'All' layout
        if(cfg.orderAllByCategory){
            reorderByCategory();
            // keep special-case promo after ordering
            (function(){
                try{
                    const sel = `a[href="${cfg.moveLubeGuardHref}"]`;
                    const lg = grid.querySelector(sel);
                    if(lg && grid.firstElementChild !== lg){ grid.insertBefore(lg, grid.firstElementChild); }
                }catch(e){}
            })();
        }

        // build category bar only if bar exists
        if(bar){
            // clear any previous content
            bar.innerHTML = '';

            function createButton(slug,label,active){
                const btn = document.createElement('button');
                btn.className = 'category-btn' + (active? ' active':'');
                btn.setAttribute('data-cat', slug);
                btn.textContent = label;
                btn.addEventListener('click', ()=>{
                    Array.from(bar.querySelectorAll('.category-btn')).forEach(b=>b.classList.remove('active'));
                    btn.classList.add('active');
                    applyFilter(slug);
                });
                return btn;
            }

            function applyFilter(cat){
                Array.from(bar.querySelectorAll('.category-btn')).forEach(b=> b.classList.toggle('active', b.dataset.cat===cat));
                if(cat==='all'){
                    // show all and optionally order by category
                    products.forEach(p=>{ p.style.display = ''; });
                    if(cfg.orderAllByCategory){
                        reorderByCategory();
                        // keep special-case promo item on top
                        try{
                            const sel = `a[href="${cfg.moveLubeGuardHref}"]`;
                            const lg = grid.querySelector(sel);
                            if(lg && grid.firstElementChild !== lg){ grid.insertBefore(lg, grid.firstElementChild); }
                        }catch(e){}
                    }
                    // Regardless of ordering mode, keep grouped duplicate-image cards at the very top
                    moveGroupedToTop();
                } else {
                    products.forEach(p=>{
                        const direct = (p.dataset && p.dataset.category) === cat;
                        const multi = (p.dataset && p.dataset.categories) ? p.dataset.categories.split(',').map(s=>s.trim()) : [];
                        const hasMulti = multi.includes(cat);
                        p.style.display = (direct || hasMulti) ? '' : 'none';
                    });
                }
            }

            // Insert All button
            bar.appendChild(createButton('all','All', true));
            cfg.categoryMap.forEach(([slug,label])=>{ if(present.has(slug)) bar.appendChild(createButton(slug,label,false)); });
        }

    }catch(err){ console.error('initProductCategoryFilter error', err); }
};

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 60;
        this.connectionDistance = 120;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    bindEvents() {
        window.addEventListener('resize', Utils.debounce(() => {
            this.resizeCanvas();
            this.particleCount = window.innerWidth < 768 ? 30 : 60;
            this.createParticles();
        }, 250));

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.2;
                    this.ctx.strokeStyle = `rgba(0, 51, 102, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = `rgba(0, 51, 102, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ===== NAVIGATION CONTROLLER =====
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveLink();
        this.initDropdowns();
        this.checkInitialScroll();
    }
    
    checkInitialScroll() {
        // Check if page has a hero section
        const hasHero = document.querySelector('.hero, .hero-modern');
        
        // If no hero section or already scrolled, add scrolled class immediately
        if (!hasHero || window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        }
    }

    initDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (toggle) {
                // Mobile: use pointer/touch handlers to reliably toggle dropdowns on first tap
                const handleToggle = (e) => {
                    // Treat as mobile-ish toggle on narrower viewports
                    if (window.innerWidth <= 1024) {
                        const isOpen = dropdown.classList.contains('active');
                        if (!isOpen) {
                            // First tap: open the dropdown (do not navigate)
                            try { e.preventDefault(); } catch (err) {}
                            try { e.stopPropagation(); } catch (err) {}

                            // Close other dropdowns
                            this.dropdowns.forEach(otherDropdown => {
                                if (otherDropdown !== dropdown) {
                                    otherDropdown.classList.remove('active');
                                }
                            });

                            dropdown.classList.add('active');
                        } else {
                            // Second tap: allow navigation to the linked page
                            // Do not prevent default here; leave dropdown open until navigation happens
                        }
                    }
                };

                // Prefer click for anchors so default navigation works when intended
                toggle.addEventListener('click', handleToggle, { passive: false });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    bindEvents() {
        // Scroll handler
        window.addEventListener('scroll', Utils.throttle(() => {
        this.handleScroll();
            this.updateActiveLink();
        }, 16));

        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't handle dropdown toggles
                if (!link.classList.contains('dropdown-toggle')) {
                    this.handleNavClick(e, link);
                }
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeMobileMenu();
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');

        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    }
        
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                Utils.scrollToElement(targetElement);
                this.closeMobileMenu();
            }
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
            
            sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.clientHeight;
                
            if (sectionTop <= 200 && sectionTop + sectionHeight > 200) {
                currentSection = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
        });
    }
}

// ===== ANIMATION CONTROLLER =====
class AnimationController {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.animateCounters();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.observedElements.add(entry.target);
                }
            });
        }, options);

        const elementsToAnimate = document.querySelectorAll(`
            .hero-content,
            .hero-visual,
            .section-header,
            .about-card,
            .experience-card,
            .product-card,
            .industry-card,
            .service-card,
            .contact-card,
            .branch-card
        `);

        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// ===== PRODUCT TABS CONTROLLER =====
class ProductTabsController {
    constructor() {
        this.tabPanels = document.querySelectorAll('.tab-panel');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.categoryOverview = document.querySelector('.category-overview');
        this.backButton = document.querySelector('.back-to-categories');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        // Hide all tab panels on initial load
        this.hideAllTabs();
        // Activate from URL hash if present
        this.initFromHash();
    }

    bindEvents() {
        // Category card events
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetTab = card.getAttribute('data-category');
                console.log('Category card clicked:', targetTab);
                this.switchTab(targetTab);
                // Hide category overview when clicking category cards
                this.hideCategoryOverview();
                // Show back button
                this.showBackButton();
                // Scroll to the tab content area
                const tabContent = document.querySelector('.tab-content');
                if (tabContent) {
                    tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Back button event
        if (this.backButton) {
            const backBtn = this.backButton.querySelector('.back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    console.log('Back button clicked');
                    this.showCategoryOverview();
                    this.hideBackButton();
                    // Scroll to category overview
                    if (this.categoryOverview) {
                        this.categoryOverview.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        }
    }

    hideAllTabs() {
        this.tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });
    }

    switchTab(targetTab) {
        // Update panels
        this.tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === targetTab) {
                panel.classList.add('active');
            }
        });
        // Update URL hash without scrolling
        try {
            if (targetTab && typeof history.replaceState === 'function') {
                const url = new URL(window.location.href);
                url.hash = `#${targetTab}`;
                history.replaceState(null, '', url.toString());
            }
        } catch (e) { /* ignore */ }
    }

    hideCategoryOverview() {
        console.log('Hiding category overview');
        if (this.categoryOverview) {
            this.categoryOverview.classList.add('hidden');
            console.log('Category overview hidden');
        } else {
            console.log('Category overview element not found!');
        }
    }

    showCategoryOverview() {
        console.log('Showing category overview');
        if (this.categoryOverview) {
            this.categoryOverview.classList.remove('hidden');
            this.hideAllTabs();
            console.log('Category overview shown');
        } else {
            console.log('Category overview element not found!');
        }
    }

    showBackButton() {
        if (this.backButton) {
            this.backButton.classList.remove('hidden');
        }
    }

    hideBackButton() {
        if (this.backButton) {
            this.backButton.classList.add('hidden');
        }
    }
}

// Extend ProductTabsController with hash init
ProductTabsController.prototype.initFromHash = function(){
    try {
        const raw = window.location.hash || '';
        const hash = raw.replace('#','');
        if (!hash) return;
        const panel = document.getElementById(hash);
        if (!panel) return;
        // Hide category overview and show tab
        if (this.categoryOverview) this.categoryOverview.classList.add('hidden');
        this.showBackButton();
        this.switchTab(hash);
        // Ensure tab content is in view
        const tabContent = document.querySelector('.tab-content');
        if (tabContent) {
            tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (e) {
        // ignore
    }
};

// ===== FORM CONTROLLER =====
class FormController {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.quoteForm = document.getElementById('quote-form');
        
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.setupForm(this.contactForm);
            this.initializeFloatingLabels(this.contactForm);
        }
        
        if (this.quoteForm) {
            this.setupForm(this.quoteForm);
            this.initializeFloatingLabels(this.quoteForm);
        }
    }

    initializeFloatingLabels(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Set initial state
            this.updateLabelPosition(input);
            
            // Add additional event listeners for better responsiveness
            input.addEventListener('keyup', () => this.updateLabelPosition(input));
            input.addEventListener('paste', () => {
                setTimeout(() => this.updateLabelPosition(input), 10);
            });
        });
    }

    setupForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
                this.updateLabelPosition(input);
            });
            input.addEventListener('input', () => {
                this.clearFieldError(input);
                this.updateLabelPosition(input);
            });
            input.addEventListener('focus', () => this.updateLabelPosition(input));
            input.addEventListener('change', () => this.updateLabelPosition(input));
            
            // Check initial state
            this.updateLabelPosition(input);
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }

        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleFormSubmit(form) {
        if (!this.validateForm(form)) {
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showSuccessMessage(form);
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
                
                if (form === this.quoteForm && window.modalController) {
                    window.modalController.closeModal();
                }
            }, 2000);
        }, 2000);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#EF4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
            errorElement.style.cssText = `
            color: #EF4444;
            font-size: 0.875rem;
                margin-top: 0.5rem;
                display: block;
            `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    updateLabelPosition(input) {
        const hasValue = input.value.trim() !== '';
        
        if (hasValue) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
        
        // Force a reflow to ensure the CSS changes take effect
        input.offsetHeight;
    }

    showSuccessMessage(form) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.style.cssText = `
            background: #10B981;
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            text-align: center;
        `;
        successElement.textContent = 'Thank you! Your message has been sent successfully.';
        
        form.insertBefore(successElement, form.firstChild);
        
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            company: 'Company Name',
            'contact-person': 'Contact Person',
            subject: 'Subject',
            message: 'Message',
            industry: 'Industry',
            'product-category': 'Product Category',
            requirements: 'Requirements'
        };
        
        return labels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    }
}

// ===== MODAL CONTROLLER =====
class ModalController {
    constructor() {
        this.modal = document.getElementById('quote-modal');
        this.quoteButtons = document.querySelectorAll('.nav-quote-btn, .quote-btn, [data-modal="quote"]');

        // If modal is missing on the page, create a minimal version so buttons still work
        if (!this.modal) {
            this.createModal();
        }

        this.modalClose = document.getElementById('modal-close');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.quoteButtons.forEach(btn => {
            // Use capture and stopImmediatePropagation to ensure modal opens even if other handlers
            // (for example page-specific redirect handlers) are attached later in the bubble phase.
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                try { e.stopImmediatePropagation(); } catch (err) {}
                this.openModal();
            }, { capture: true });
        });
        
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (this.modal) {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const firstInput = this.modal.querySelector('input, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Create a minimal quote modal when none exists on the page
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'quote-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Request a Quote</h3>
                    <button class="modal-close" id="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <form id="quote-form">
                        <div class="form-row">
                            <div class="form-group"><input name="company" required><label>Company Name</label></div>
                            <div class="form-group"><input name="contact-person" required><label>Contact Person</label></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group"><input name="email" type="email" required><label>Email</label></div>
                            <div class="form-group"><input name="phone" required><label>Phone</label></div>
                        </div>
                        <div class="form-group">
                            <select name="product-category"><option value="">Select Product Category</option></select>
                            <label>Product Category</label>
                        </div>
                        <div class="form-group">
                            <textarea name="requirements" rows="4"></textarea>
                            <label>Requirements</label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Send via WhatsApp</button>
                    </form>
                </div>
            </div>`;

        // hide by default (styles assume .active shows it)
        modal.style.display = 'none';
        document.body.appendChild(modal);

        // update references
        this.modal = modal;
        this.modalClose = document.getElementById('modal-close');

        // small close handler
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => { this.closeModal(); });
        }
    }
}

// ===== BACK TO TOP CONTROLLER =====
class BackToTopController {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100));

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== INTERACTIVE LIQUID ANIMATION =====
class LiquidAnimation {
    constructor() {
        this.canvas = document.getElementById('liquidCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight * 0.5;
        this.lastX = this.width / 2;
        this.lastY = this.height / 2;
        this.points = [];
        this.numPoints = 100;
        this.viscosity = 20;
        this.mouseDist = 80;
        this.damping = 0.15;
        this.touchForce = 2;
        this.baseHeight = this.height * 0.5;
        this.color = '#FFD700';
        this.frameCount = 0;

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Initialize points
        const spacing = this.width / (this.numPoints - 1);
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({
                x: spacing * i,
                y: this.baseHeight,
                originalY: this.baseHeight,
                velocity: 0,
                force: 0
            });
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.mouseMoved(x, y);
        });

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight * 0.5;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.baseHeight = this.height * 0.5;
            this.init();
        });
    }

    mouseMoved(x, y) {
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        const mouseSpeed = Math.sqrt(dx * dx + dy * dy) * this.touchForce;

        this.points.forEach(point => {
            const dist = Math.abs(x - point.x);
            if (dist < this.mouseDist) {
                const force = (1 - (dist / this.mouseDist)) * mouseSpeed;
                point.force = force;
            }
        });

        this.lastX = x;
        this.lastY = y;
    }

    updatePoints() {
        this.points.forEach(point => {
            let force = point.force;
            point.force = 0;

            // Add some random movement
            force += (Math.random() - 0.5) * 0.2;

            point.velocity *= (1 - this.damping);
            point.velocity += force / this.viscosity;
            point.y += point.velocity;

            // Spring back to original position
            const dy = point.originalY - point.y;
            point.velocity += dy * 0.01;
        });
    }

    drawLiquid() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        this.ctx.lineTo(this.points[0].x, this.points[0].y);

        // Create smooth curve through points
        for (let i = 0; i < this.points.length - 1; i++) {
            const curr = this.points[i];
            const next = this.points[i + 1];
            const cx = (curr.x + next.x) * 0.5;
            const cy = (curr.y + next.y) * 0.5;
            this.ctx.quadraticCurveTo(curr.x, curr.y, cx, cy);
        }

        this.ctx.lineTo(this.width, this.height);
        this.ctx.closePath();
        this.ctx.fill();

        // Add gradient overlay
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 196, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(218, 165, 32, 0.9)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.updatePoints();
        this.drawLiquid();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize liquid animation
document.addEventListener('DOMContentLoaded', () => {
    new LiquidAnimation();
});

// ===== LOADING SCREEN CONTROLLER =====
class LoadingController {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Hide loading screen immediately when all content is loaded
        window.addEventListener('load', () => {
            this.hideLoading();
        });

        // Fallback: Hide loading screen after 2 seconds even if not fully loaded
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    hideLoading() {
        if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
            this.loadingScreen.classList.add('hidden');
            
            // Remove the loading screen element after transition completes
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.remove();
                }
            }, 500);
        }
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.observeElements();
    }

    setupScrollAnimations() {
        // Add animation classes to elements
        const elementsToAnimate = [
            { selector: '.hero-content', animation: 'animate-fade-in-left' },
            { selector: '.hero-image', animation: 'animate-fade-in-right' },
            { selector: '.section-header', animation: 'animate-slide-up' },
            { selector: '.service-card', animation: 'animate-scale-in' },
            { selector: '.product-card', animation: 'animate-bounce-in' },
            { selector: '.trust-item', animation: 'animate-slide-up' },
            { selector: '.contact-method', animation: 'animate-fade-in-left' },
            { selector: '.contact-form-container', animation: 'animate-fade-in-right' },
            { selector: '.footer-col', animation: 'animate-slide-up' }
        ];

        elementsToAnimate.forEach(({ selector, animation }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add(animation);
                if (index > 0) {
                    element.classList.add(`animate-delay-${Math.min(index, 6)}`);
                }
                this.animatedElements.push(element);
            });
        });

        // Add hover effects to specific elements
        const hoverElements = document.querySelectorAll('.service-card, .product-card, .trust-item');
        hoverElements.forEach(element => {
            element.classList.add('hover-float');
        });

        const glowElements = document.querySelectorAll('.btn-primary, .nav-quote-btn');
        glowElements.forEach(element => {
            element.classList.add('hover-glow');
        });

        // Add special animations for hero elements
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('animate-bounce-in');
            this.animatedElements.push(heroTitle);
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.classList.add('animate-slide-up', 'animate-delay-1');
            this.animatedElements.push(heroSubtitle);
        }

        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach((btn, index) => {
            btn.classList.add('animate-scale-in', `animate-delay-${index + 2}`);
            this.animatedElements.push(btn);
        });

        // Add staggered animations to grid items
    const gridItems = document.querySelectorAll('.services-grid .service-card, .products-grid .product-card:not(.product-card-grouped), .trust-grid .trust-item');
        gridItems.forEach((item, index) => {
            item.classList.add('animate-scale-in', `animate-delay-${(index % 6) + 1}`);
            this.animatedElements.push(item);
        });
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===== MOUSE EFFECTS =====
class MouseEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupMagneticEffect();
        this.setupTiltEffect();
    }

    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .product-card, .industry-card');

        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.3s ease';
            });

            element.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = element.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;

                element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    setupTiltEffect() {
        const tiltElements = document.querySelectorAll('.floating-card');

        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = element.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (centerX - e.clientX) / 10;
            
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
}

// ===== HERO SLIDER CONTROLLER =====
class HeroSliderController {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('hero-prev');
        this.nextBtn = document.getElementById('hero-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.bindEvents();
        this.startAutoSlide();
    }

    bindEvents() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Pause auto-slide on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            heroSlider.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    destroy() {
        this.stopAutoSlide();
        document.removeEventListener('keydown', this.handleKeydown);
    }
}

// ===== CAROUSEL CONTROLLER =====
class CarouselController {
    constructor() {
        this.carousel = document.getElementById('industries-carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.isMobile = window.innerWidth <= 768;
    // Faster carousel: shorten auto-slide delay for snappier UX
    // 1.5s for mobile, 3s for desktop
    this.autoSlideDelay = this.isMobile ? 1500 : 3000; // ms
        
        this.init();
    }

    init() {
        if (!this.carousel || this.totalSlides === 0) return;

        this.createIndicators();
        this.bindEvents();
        this.startAutoSlide();
        this.updateCarousel();
        
        // Listen for window resize to adjust behavior
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                // keep same faster delays when switching modes
                this.autoSlideDelay = this.isMobile ? 1500 : 3000;
                this.currentSlide = 0; // Reset to first slide when switching modes
                
                // Reset all styles and classes when switching modes
                const slides = document.querySelectorAll('.carousel-slide');
                const allPanels = document.querySelectorAll('.industry-panel');
                
                slides.forEach(slide => slide.classList.remove('mobile-active'));
                allPanels.forEach(panel => panel.classList.remove('mobile-panel-active'));
                this.carousel.style.transform = '';
                
                this.createIndicators(); // Recreate indicators for new mode
                this.updateCarousel();
                this.resetAutoSlide();
            }
        });
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;

        this.indicatorsContainer.innerHTML = '';
        
        // On mobile, create indicators for each individual industry panel
        if (this.isMobile) {
            // Count total industry panels across all slides
            const totalPanels = document.querySelectorAll('.industry-panel').length;
            
            for (let i = 0; i < totalPanels; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    this.goToSlide(i);
                });
                
                this.indicatorsContainer.appendChild(indicator);
            }
        } else {
            // On desktop, create indicators for slides (groups of 4)
            for (let i = 0; i < this.totalSlides; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                if (i === 0) indicator.classList.add('active');
                
                indicator.addEventListener('click', () => {
                    this.goToSlide(i);
                });
                
                this.indicatorsContainer.appendChild(indicator);
            }
        }
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Pause auto-slide on hover
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            this.carousel.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        // Touch/swipe support
        this.addTouchSupport();
    }

    addTouchSupport() {
        if (!this.carousel) return;

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }
        });
    }

    goToSlide(slideIndex) {
        if (this.isMobile) {
            // On mobile, slideIndex refers to individual industry panels
            const totalPanels = document.querySelectorAll('.industry-panel').length;
            if (slideIndex < 0 || slideIndex >= totalPanels) return;
        } else {
            // On desktop, slideIndex refers to slides (groups of 4)
            if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        }
        
        this.currentSlide = slideIndex;
        this.updateCarousel();
        this.resetAutoSlide();
    }

    nextSlide() {
        if (this.isMobile) {
            // On mobile, navigate through individual industry panels
            const totalPanels = document.querySelectorAll('.industry-panel').length;
            this.currentSlide = (this.currentSlide + 1) % totalPanels;
        } else {
            // On desktop, navigate through slides (groups of 4)
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        }
        this.updateCarousel();
        this.resetAutoSlide();
    }

    prevSlide() {
        if (this.isMobile) {
            // On mobile, navigate through individual industry panels
            const totalPanels = document.querySelectorAll('.industry-panel').length;
            this.currentSlide = (this.currentSlide - 1 + totalPanels) % totalPanels;
        } else {
            // On desktop, navigate through slides (groups of 4)
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        }
        this.updateCarousel();
        this.resetAutoSlide();
    }

    updateCarousel() {
        if (!this.carousel) return;

        if (this.isMobile) {
            // On mobile, show individual industry panels
            const slides = document.querySelectorAll('.carousel-slide');
            const allPanels = document.querySelectorAll('.industry-panel');
            const totalPanels = allPanels.length;
            
            // Remove all active classes
            slides.forEach(slide => slide.classList.remove('mobile-active'));
            allPanels.forEach(panel => panel.classList.remove('mobile-panel-active'));
            
            // Find the specific panel to show
            if (allPanels[this.currentSlide]) {
                const targetPanel = allPanels[this.currentSlide];
                const parentSlide = targetPanel.closest('.carousel-slide');
                
                // Show the parent slide and the target panel
                if (parentSlide) {
                    parentSlide.classList.add('mobile-active');
                }
                targetPanel.classList.add('mobile-panel-active');
            }
            
            // Update indicators
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
            
            // Update button states for mobile
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentSlide === 0;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentSlide === totalPanels - 1;
            }
        } else {
            // Desktop behavior - show slides with 4 panels each
            const slides = document.querySelectorAll('.carousel-slide');
            const allPanels = document.querySelectorAll('.industry-panel');
            
            // Remove mobile classes for desktop
            slides.forEach(slide => slide.classList.remove('mobile-active'));
            allPanels.forEach(panel => panel.classList.remove('mobile-panel-active'));
            
            const translateX = -this.currentSlide * 100;
            this.carousel.style.transform = `translateX(${translateX}%)`;

            // Update indicators
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });

            // Update button states for desktop
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentSlide === 0;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            }
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    destroy() {
        this.stopAutoSlide();
        
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prevSlide);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.nextSlide);
        }
    }
}

// ===== MAIN APPLICATION =====
class UngdakaApp {
    constructor() {
        this.controllers = {};
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeControllers();
            });
        } else {
            this.initializeControllers();
        }
    }

    initializeControllers() {
        try {
            this.controllers.loading = new LoadingController();

            const particlesCanvas = document.getElementById('particles-canvas');
            if (particlesCanvas) {
                this.controllers.particles = new ParticleSystem(particlesCanvas);
                window.particleSystem = this.controllers.particles;
            }

            this.controllers.navigation = new NavigationController();
            this.controllers.animation = new AnimationController();
            this.controllers.heroSlider = new HeroSliderController();
            this.controllers.productTabs = new ProductTabsController();
            this.controllers.forms = new FormController();
            this.controllers.modal = new ModalController();
            this.controllers.backToTop = new BackToTopController();
            this.controllers.mouseEffects = new MouseEffects();
            this.controllers.scrollAnimations = new ScrollAnimations();
            this.controllers.carousel = new CarouselController();

            window.modalController = this.controllers.modal;

            console.log('Ungdaka website initialized successfully');
        } catch (error) {
            console.error('Error initializing Ungdaka website:', error);
        }
    }

    destroy() {
        Object.values(this.controllers).forEach(controller => {
            if (controller.destroy && typeof controller.destroy === 'function') {
                controller.destroy();
            }
        });
    }
}

// ===== INITIALIZE APPLICATION =====
const app = new UngdakaApp();

// Ensure any hash matching a product category always forces the products panel to show.
(function enforceProductHashHandler(){
    // Normalizer maps common variants to canonical panel IDs
    function normalizeCategory(name){
        if(!name) return '';
        var s = String(name).toLowerCase().trim();
        var map = [
            [/aero|aerosol/, 'aerosol'],
            [/lubricat|industrial-?lubricant|lubricants?/, 'lubricants'],
            [/grease/, 'grease'],
            [/maintain|maintenance/, 'maintenance'],
            [/metal|metal-?working/, 'metalworking'],
            [/accessor|accessories/, 'accessories'],
            [/food|food-?grade|foodsafe|food-?safe|foodgrade/, 'foodgrade']
        ];
        for(var i=0;i<map.length;i++){ if(map[i][0].test(s)) return map[i][1]; }
        return s.replace(/[^a-z0-9]/g,'');
    }

    function applyHashToTabs(){
        try{
            var raw = (window.location.hash || '').replace(/^#/,'').trim().toLowerCase();
            if(!raw) return;
            var cat = normalizeCategory(raw);
            // If product tabs controller is present, force it to show the tab
            var tabs = window.app && window.app.controllers && window.app.controllers.productTabs;
            if(tabs){
                try{
                    // Hide overview if present
                    if(typeof tabs.hideCategoryOverview === 'function') tabs.hideCategoryOverview();
                    if(typeof tabs.showBackButton === 'function') tabs.showBackButton();
                    if(typeof tabs.switchTab === 'function') tabs.switchTab(cat);
                }catch(e){ /* ignore individual errors */ }
            }
            // Also ensure the pill buttons reflect state (if present on page)
            try{
                var pills = document.querySelectorAll('.product-category-bar .category-btn');
                if(pills && pills.length){
                    pills.forEach(function(p){ p.classList.toggle('active', (p.getAttribute('data-filter')||'').toLowerCase() === cat); });
                }
            }catch(e){}
        }catch(e){ /* swallow */ }
    }

    // Run on load (after app init) and on every hashchange
    window.addEventListener('hashchange', applyHashToTabs);
    // Small delay to ensure controllers initialized
    setTimeout(applyHashToTabs, 300);
})();

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Shared: Collapsible category groups inside all dropdown menus (Products, Industries)
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Ensure dropdown menus exist in the header across all pages
        (function ensureHeaderDropdowns(){
            try {
                const navMenu = document.getElementById('nav-menu');
                if (!navMenu) return;

                const hasProductsDropdown = !!navMenu.querySelector('.nav-dropdown .dropdown-toggle[href$="products.html"], .nav-dropdown .dropdown-toggle[href*="products.html?"], .nav-dropdown .dropdown-toggle[href*="products.html#"]');
                const hasIndustriesDropdown = !!navMenu.querySelector('.nav-dropdown .dropdown-toggle[href$="industries.html"], .nav-dropdown .dropdown-toggle[href*="industries.html?"]');

                // Determine base path for links based on page depth
                const isProductDetail = document.body && document.body.classList.contains('product-page');
                const base = isProductDetail ? '../' : '';

                // Helper to create element from HTML string
                const createEl = (html) => {
                    const tmp = document.createElement('div');
                    tmp.innerHTML = html.trim();
                    return tmp.firstElementChild;
                };

                if (!hasProductsDropdown) {
                    const productsHTML = `
                        <div class="nav-dropdown">
                            <a href="${base}products.html#aerosol" class="nav-link dropdown-toggle${location.pathname.endsWith('products.html') ? ' active' : ''}">
                                Our Products
                                <i class="fas fa-chevron-down dropdown-icon"></i>
                            </a>
                            <div class="dropdown-menu">
                                <div class="dropdown-content">
                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#aerosol">Aerosol Products</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-aerosol"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-aerosol">
                                                <a class="sub-link" href="${base}products/s-88-paintable.html">S-88 Silicone Mould Release</a>
                                                <a class="sub-link" href="${base}products/ns-77-non-silicone-mould-release.html">NS-77 Non-Silicone Mould Release</a>
                                                <a class="sub-link" href="${base}products/s-22-degreaser-mould-cleaner.html">S-22 Degreaser & Mould Cleaner</a>
                                                <a class="sub-link view-all" href="${base}products.html#aerosol">View all →</a>
                                            </div>
                                        </div>

                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#lubricants">Industrial Lubricants</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-lubricants"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-lubricants">
                                                <a class="sub-link" href="${base}products/engine-oils.html">Engine Oils</a>
                                                <a class="sub-link" href="${base}products/hydraulic-awx-series.html">Hydraulic Oils</a>
                                                <a class="sub-link" href="${base}products/industrial-gear-series.html">Industrial Gear Oils</a>
                                                <a class="sub-link view-all" href="${base}products.html#lubricants">View all →</a>
                                            </div>
                                        </div>

                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#grease">Industrial Grease</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-grease"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-grease">
                                                <a class="sub-link" href="${base}products/heavy-duty-grease.html">Heavy Duty Grease</a>
                                                <a class="sub-link" href="${base}products/lit-888-ep-grease.html">LIT 888 EP Grease</a>
                                                <a class="sub-link" href="${base}products/hi-lo-grease.html">Hi-Lo Grease</a>
                                                <a class="sub-link view-all" href="${base}products.html#grease">View all →</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#maintenance">Maintenance Chemicals</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-maintenance"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-maintenance">
                                                <a class="sub-link" href="${base}products/oil-degreaser.html">Oil Degreaser</a>
                                                <a class="sub-link" href="${base}products/industrial-paint-remover.html">Industrial Paint Remover</a>
                                                <a class="sub-link" href="${base}products/rust-remover-chemical.html">Rust Remover Chemical</a>
                                                <a class="sub-link view-all" href="${base}products.html#maintenance">View all →</a>
                                            </div>
                                        </div>

                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#metalworking">Metal Working</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-metalworking"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-metalworking">
                                                <a class="sub-link" href="${base}products/water-soluble-cutting-coolants.html">Water-Soluble Cutting Coolants</a>
                                                <a class="sub-link" href="${base}products/neat-cutting-oils.html">Neat Cutting Oils</a>
                                                <a class="sub-link" href="${base}products/tapping-fluids.html">Tapping Fluids</a>
                                                <a class="sub-link view-all" href="${base}products.html#metalworking">View all →</a>
                                            </div>
                                        </div>

                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#accessories">Accessories</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-accessories"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-accessories">
                                                <a class="sub-link" href="${base}products/handheld-refractometer.html">Handheld Refractometer</a>
                                                <a class="sub-link" href="${base}products/handheld-ph-reader.html">Handheld pH Reader</a>
                                                <a class="sub-link" href="${base}products/cnc-os-oil-skimmer.html">CNC OS Oil Skimmer</a>
                                                <a class="sub-link view-all" href="${base}products.html#accessories">View all →</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}products.html#foodgrade">Food-Safe Products</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-foodgrade"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-foodgrade">
                                                <a class="sub-link" href="${base}products/protean-3h1-grease.html">PROTEAN 3H1 Grease</a>
                                                <a class="sub-link" href="${base}products/protean-white-grease.html">PROTEAN White Grease</a>
                                                <a class="sub-link" href="${base}products/protean-airline-oils.html">PROTEAN Airline Oils</a>
                                                <a class="sub-link" href="${base}products/protean-chain-gear-oils-new.html">PROTEAN Chain & Gear Oils</a>
                                                <a class="sub-link view-all" href="${base}products.html#foodgrade">View all →</a>
                                            </div>
                                        </div>
                                        <a href="${base}products.html#aerosol" class="view-all" style="margin-top:10px; display:inline-block;">View All Products →</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    // Insert after About link (or before Contact link if present)
                    const aboutLink = navMenu.querySelector('a.nav-link[href$="about.html"], a.nav-link[href*="about.html?"]');
                    const contactLink = navMenu.querySelector('a.nav-link[href$="contact.html"], a.nav-link[href*="contact.html?"]');
                    const node = createEl(productsHTML);
                    if (aboutLink && aboutLink.parentNode === navMenu) {
                        navMenu.insertBefore(node, aboutLink.nextSibling);
                    } else if (contactLink) {
                        navMenu.insertBefore(node, contactLink);
                    } else {
                        navMenu.appendChild(node);
                    }

                    // Bind mobile toggle behavior to the injected dropdown
                    try {
                        const toggle = node.querySelector('.dropdown-toggle');
                        if (toggle) {
                            toggle.addEventListener('click', (e) => {
                                if (window.innerWidth <= 1024) {
                                    const dd = toggle.closest('.nav-dropdown');
                                    const isOpen = dd && dd.classList.contains('active');
                                    if (!isOpen) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // close siblings
                                        document.querySelectorAll('.nav-dropdown').forEach(other => {
                                            if (other !== dd) other.classList.remove('active');
                                        });
                                        dd && dd.classList.add('active');
                                    }
                                }
                            }, { passive: false });
                        }
                    } catch (e) { /* ignore */ }
                }

                if (!hasIndustriesDropdown) {
                    const industriesHTML = `
                        <div class="nav-dropdown">
                            <a href="${base}industries.html" class="nav-link dropdown-toggle${location.pathname.endsWith('industries.html') ? ' active' : ''}">
                                Industries
                                <i class="fas fa-chevron-down dropdown-icon"></i>
                            </a>
                            <div class="dropdown-menu">
                                <div class="dropdown-content">
                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}industries.html">Manufacturing</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-ind-manufacturing"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-ind-manufacturing">
                                                <a class="sub-link" href="${base}stamping-products.html">Stamping</a>
                                                <a class="sub-link" href="${base}automotive-transportation-products.html">Automotive & Transportation</a>
                                                <a class="sub-link" href="${base}plastic-injection-products.html">Plastic Injection</a>
                                                <a class="sub-link" href="${base}machining-engineering-products.html">Machining & Engineering</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}industries.html">Heavy Industries</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-ind-heavy"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-ind-heavy">
                                                <a class="sub-link" href="${base}construction-cement-products.html">Construction & Cement</a>
                                                <a class="sub-link" href="${base}marine-offshore-products.html">Marine & Offshore</a>
                                                <a class="sub-link" href="${base}oil-gas-products.html">Oil & Gas</a>
                                                <a class="sub-link" href="${base}quarries-products.html">Quarries</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dropdown-column">
                                        <div class="cat-group">
                                            <div class="cat-header">
                                                <a class="cat-link" href="${base}industries.html">Specialized</a>
                                                <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-ind-specialized"><i class="fas fa-chevron-right"></i></button>
                                            </div>
                                            <div class="sub-list" id="cat-ind-specialized">
                                                <a class="sub-link" href="${base}semiconductor-disk-drive-products.html">Semiconductor & Disk Drive</a>
                                                <a class="sub-link" href="${base}food-beverage-pharmaceutical-products.html">Food & Beverage</a>
                                                <a class="sub-link" href="${base}rubber-latex-products.html">Rubber & Latex</a>
                                                <a class="sub-link" href="${base}printing-paper-products.html">Printing & Paper</a>
                                                <a class="sub-link" href="${base}workshops-automotive-products.html">Workshops</a>
                                            </div>
                                        </div>
                                        <a href="${base}industries.html" class="view-all">View All Industries →</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

                    const contactLink = navMenu.querySelector('a.nav-link[href$="contact.html"], a.nav-link[href*="contact.html?"]');
                    const node = createEl(industriesHTML);
                    if (contactLink) {
                        navMenu.insertBefore(node, contactLink);
                    } else {
                        navMenu.appendChild(node);
                    }

                    // Bind mobile toggle behavior to the injected dropdown
                    try {
                        const toggle = node.querySelector('.dropdown-toggle');
                        if (toggle) {
                            toggle.addEventListener('click', (e) => {
                                if (window.innerWidth <= 1024) {
                                    const dd = toggle.closest('.nav-dropdown');
                                    const isOpen = dd && dd.classList.contains('active');
                                    if (!isOpen) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        document.querySelectorAll('.nav-dropdown').forEach(other => {
                                            if (other !== dd) other.classList.remove('active');
                                        });
                                        dd && dd.classList.add('active');
                                    }
                                }
                            }, { passive: false });
                        }
                    } catch (e) { /* ignore */ }
                }
            } catch (e) { /* ignore */ }
        })();

        // Ensure Products dropdown contains all categories (unify across pages)
        (function unifyProductsDropdown(){
            try {
                const dropdowns = document.querySelectorAll('.navbar .nav-dropdown');
                dropdowns.forEach(dd => {
                    const toggle = dd.querySelector('.dropdown-toggle');
                    const href = toggle && toggle.getAttribute('href');
                    // Identify the "Our Products" dropdown by its link to products.html
                    if (!href || !/products\.html(?:$|[?#])/.test(href)) return;
                    const content = dd.querySelector('.dropdown-menu .dropdown-content');
                    if (!content) return;

                    // If already has all three columns and Food Grade group, skip
                    const hasFood = !!content.querySelector('#cat-foodgrade');
                    const groupNodesCheck = content.querySelectorAll('.cat-group');
                    if (hasFood && groupNodesCheck.length >= 6) return;

                    // Build the full dropdown content to match homepage
                    const html = `
                        <div class="dropdown-column">
                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#aerosol">Aerosol Products</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-aerosol"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-aerosol">
                                    <a class="sub-link" href="products/s-88-paintable.html">S-88 Silicone Mould Release</a>
                                    <a class="sub-link" href="products/ns-77-non-silicone-mould-release.html">NS-77 Non-Silicone Mould Release</a>
                                    <a class="sub-link" href="products/s-22-degreaser-mould-cleaner.html">S-22 Degreaser & Mould Cleaner</a>
                                    <a class="sub-link view-all" href="products.html#aerosol">View all →</a>
                                </div>
                            </div>

                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#lubricants">Industrial Lubricants</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-lubricants"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-lubricants">
                                    <a class="sub-link" href="products/engine-oils.html">Engine Oils</a>
                                    <a class="sub-link" href="products/hydraulic-awx-series.html">Hydraulic Oils</a>
                                    <a class="sub-link" href="products/industrial-gear-series.html">Industrial Gear Oils</a>
                                    <a class="sub-link view-all" href="products.html#lubricants">View all →</a>
                                </div>
                            </div>

                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#grease">Industrial Grease</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-grease"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-grease">
                                    <a class="sub-link" href="products/heavy-duty-grease.html">Heavy Duty Grease</a>
                                    <a class="sub-link" href="products/lit-888-ep-grease.html">LIT 888 EP Grease</a>
                                    <a class="sub-link" href="products/hi-lo-grease.html">Hi-Lo Grease</a>
                                    <a class="sub-link view-all" href="products.html#grease">View all →</a>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown-column">
                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#maintenance">Maintenance Chemicals</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-maintenance"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-maintenance">
                                    <a class="sub-link" href="products/oil-degreaser.html">Oil Degreaser</a>
                                    <a class="sub-link" href="products/industrial-paint-remover.html">Industrial Paint Remover</a>
                                    <a class="sub-link" href="products/rust-remover-chemical.html">Rust Remover Chemical</a>
                                    <a class="sub-link view-all" href="products.html#maintenance">View all →</a>
                                </div>
                            </div>

                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#metalworking">Metal Working</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-metalworking"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-metalworking">
                                    <a class="sub-link" href="products/water-soluble-cutting-coolants.html">Water-Soluble Cutting Coolants</a>
                                    <a class="sub-link" href="products/neat-cutting-oils.html">Neat Cutting Oils</a>
                                    <a class="sub-link" href="products/tapping-fluids.html">Tapping Fluids</a>
                                    <a class="sub-link view-all" href="products.html#metalworking">View all →</a>
                                </div>
                            </div>

                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#accessories">Accessories</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-accessories"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-accessories">
                                    <a class="sub-link" href="products/handheld-refractometer.html">Handheld Refractometer</a>
                                    <a class="sub-link" href="products/handheld-ph-reader.html">Handheld pH Reader</a>
                                    <a class="sub-link" href="products/cnc-os-oil-skimmer.html">CNC OS Oil Skimmer</a>
                                    <a class="sub-link view-all" href="products.html#accessories">View all →</a>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown-column">
                            <div class="cat-group">
                                <div class="cat-header">
                                    <a class="cat-link" href="products.html#foodgrade">Food-Safe Products</a>
                                    <button class="cat-toggle" type="button" aria-expanded="false" aria-controls="cat-foodgrade"><i class="fas fa-chevron-right"></i></button>
                                </div>
                                <div class="sub-list" id="cat-foodgrade">
                                    <a class="sub-link" href="products/protean-3h1-grease.html">PROTEAN 3H1 Grease</a>
                                    <a class="sub-link" href="products/protean-white-grease.html">PROTEAN White Grease</a>
                                    <a class="sub-link" href="products/protean-airline-oils.html">PROTEAN Airline Oils</a>
                                    <a class="sub-link" href="products/protean-chain-gear-oils-new.html">PROTEAN Chain & Gear Oils</a>
                                    <a class="sub-link view-all" href="products.html#foodgrade">View all →</a>
                                </div>
                            </div>
                            <a href="products.html" class="view-all" style="margin-top:10px; display:inline-block;">View All Products →</a>
                        </div>`;

                    // Replace dropdown content
                    content.innerHTML = html;

                    // Rebind toggle buttons inside newly injected content
                    const groupNodesRebind = content.querySelectorAll('.cat-group');
                    groupNodesRebind.forEach(group => {
                        const btn = group.querySelector('.cat-toggle');
                        btn?.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const isOpen = group.classList.toggle('open');
                            btn.setAttribute('aria-expanded', String(isOpen));
                        });
                    });
                });
            } catch (e) { /* ignore */ }
        })();

        const menus = document.querySelectorAll('.nav-dropdown .dropdown-menu');
        if(!menus.length) return;
        menus.forEach(menu => {
            const groups = menu.querySelectorAll('.cat-group');
            groups.forEach(group => {
                const btn = group.querySelector('.cat-toggle');
                const sub = group.querySelector('.sub-list');
                if(!btn || !sub) return;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const isOpen = group.classList.toggle('open');
                    btn.setAttribute('aria-expanded', String(isOpen));
                });

                // Industries dropdown: remove titles and keep lists open
                try {
                    const subId = sub.id || '';
                    if (subId.startsWith('cat-ind-')) {
                        // Open by default
                        group.classList.add('open');
                        // Hide the group title link and toggle button
                        const titleLink = group.querySelector('.cat-link');
                        if (titleLink) titleLink.style.display = 'none';
                        if (btn) btn.style.display = 'none';
                    }
                } catch (e) { /* ignore */ }
            });
        });
    } catch (err) {
        // swallow any minor errors
    }
});

// Make header logo navigate to Home if not already a link
document.addEventListener('DOMContentLoaded', () => {
    try {
        const navLogo = document.querySelector('.nav-logo');
        if (!navLogo) return;
        const hasAnchor = !!navLogo.querySelector('a');
        if (!hasAnchor) {
            // Find an existing Home link to copy URL; fallback to index.html
            const homeLink = document.querySelector('.nav-menu a.nav-link[href="index.html"]');
            const homeHref = homeLink ? homeLink.getAttribute('href') : 'index.html';
            navLogo.style.cursor = 'pointer';
            navLogo.addEventListener('click', () => { window.location.href = homeHref; });
        }
    } catch (e) {
        // ignore
    }
});

// Inject shared header from includes/header.html into pages (tries several relative paths)
// This centralizes the header at runtime so all pages render the same markup without editing each HTML file.
document.addEventListener('DOMContentLoaded', () => {
    (async function injectSharedHeader(){
        try {
            const candidates = ['includes/header.html','./includes/header.html','../includes/header.html','/includes/header.html'];
            let html = null;
            for (const p of candidates) {
                try {
                    const res = await fetch(p, { cache: 'no-store' });
                    if (res && res.ok) { html = await res.text(); break; }
                } catch (err) {
                    // try next path
                }
            }
            if (!html) return;

            const tmp = document.createElement('div');
            tmp.innerHTML = html.trim();
            const newNav = tmp.querySelector('nav#navbar') || tmp.querySelector('nav');
            if (!newNav) return;

            // If we're already on the products page, normalize any injected
            // product-category links from forms like "products.html#cat" or
            // "./products.html#cat" to plain fragment links "#cat". This
            // ensures native hash navigation (and the page's existing
            // hashchange handlers) run reliably when clicking the header
            // while on products.html.
            try {
                var isProductsPagePath = /\/?products(?:\.html)?(?:$|[?#])/i.test(window.location.pathname);
                if (isProductsPagePath) {
                    newNav.querySelectorAll('a[href]').forEach(function(a){
                        try {
                            var h = a.getAttribute('href') || '';
                            var m = h.match(/(?:\.\/|(?:\.\.\/)|\/)?(?:products(?:\.html)?)#(.+)$/i);
                            if (m && m[1]) {
                                a.setAttribute('href', '#' + m[1]);
                            }
                        } catch (e) { /* ignore per defensive insertion */ }
                    });
                }
            } catch (e) { /* ignore */ }

            const oldNav = document.querySelector('nav#navbar');
            if (oldNav) {
                // Replace old nav with cloned imported node
                oldNav.replaceWith(newNav.cloneNode(true));
            } else {
                // Insert at top of body if no existing nav
                document.body.insertBefore(newNav.cloneNode(true), document.body.firstChild);
            }
        } catch (e) {
            // ignore fetch/insertion errors
        }
    })();
});

// Remove duplicate "Our Products" entries in the header (keep the first one)
document.addEventListener('DOMContentLoaded', () => {
    try {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;

        // Find dropdown blocks and plain links that represent "Our Products"
        const productDropdowns = Array.from(navMenu.querySelectorAll('.nav-dropdown'))
            .filter(dd => {
                const toggle = dd.querySelector('.dropdown-toggle');
                return toggle && /\bOur Products\b/i.test(toggle.textContent || '');
            });

        // If there are multiple dropdowns, remove all but the first one
        if (productDropdowns.length > 1) {
            productDropdowns.slice(1).forEach(dd => dd.remove());
        }

        // Also handle direct nav links (non-dropdown) with the exact text "Our Products"
        const productLinks = Array.from(navMenu.querySelectorAll('a.nav-link'))
            .filter(a => /^\s*Our Products\s*$/i.test(a.textContent || ''));
        if (productLinks.length > 1) {
            // Keep the first occurrence and remove subsequent ones
            productLinks.slice(1).forEach(a => {
                // If the link is inside a nav-dropdown we already handled, skip
                const parentDropdown = a.closest('.nav-dropdown');
                if (parentDropdown && navMenu.contains(parentDropdown)) return;
                a.remove();
            });
        }
    } catch (e) {
        // swallow any minor errors
    }
});

// When on the products page, clicking a header dropdown category that links to
// "products.html#category" should show the category panel without a full reload.
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Only activate when the products tab content exists on the page
        const isProductsPage = !!document.querySelector('.tab-content');
        if (!isProductsPage) return;

        // Delegate clicks on category links inside nav menus
        document.addEventListener('click', (e) => {
            const a = e.target.closest && e.target.closest('a');
            if (!a) return;
            const href = (a.getAttribute('href') || '').trim();
            if (!href || href.indexOf('#') === -1) return;

            try {
                // Parse the href relative to current location to accept absolute or relative URLs
                const parsed = new URL(href, window.location.href);
                let targetHash = (parsed.hash || '').replace(/^#/, '');
                if (!targetHash) return;

                // Normalize category names (support many href variants like "industrial-lubricants", "lubricants", "industrial-lubricants#", "food-grade", etc.)
                function normalizeCategory(name){
                    if(!name) return name;
                    const s = name.toLowerCase().trim();
                    const map = [
                        [/aero|aerosol/, 'aerosol'],
                        [/lubricat|industrial-?lubricant|lubricants?/, 'lubricants'],
                        [/grease/, 'grease'],
                        [/maintain|maintenance/, 'maintenance'],
                        [/metal|metal-?working/, 'metalworking'],
                        [/accessor|accessories/, 'accessories'],
                        [/food|food-?grade|foodsafe|food-?safe|foodgrade/, 'foodgrade']
                    ];
                    for(const [re, id] of map){ if(re.test(s)) return id; }
                    // fallback: strip non-alphanum and return
                    return s.replace(/[^a-z0-9]/g,'');
                }

                targetHash = normalizeCategory(targetHash);

                // Only handle when either the current page or the link target is the products page
                const currentIsProducts = /\/?products(?:\.html)?(?:$|[?#])/i.test(window.location.pathname);
                const targetIsProducts = /\/?products(?:\.html)?(?:$|[?#])/i.test(parsed.pathname);
                if (!currentIsProducts && !targetIsProducts) return;

                // Prevent default navigation and trigger hash-driven UI
                e.preventDefault();
                if (window.location.hash.replace('#', '') !== targetHash) {
                    window.location.hash = '#' + targetHash;
                } else {
                    // Force handlers when clicking same hash
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                }

                // Defensive fallback: if the product tabs controller exists, call it directly
                // This ensures the panel shows even if the normal hashchange path is missed
                try {
                    const tabs = window.app && window.app.controllers && window.app.controllers.productTabs;
                    if (tabs) {
                        if (typeof tabs.initFromHash === 'function') {
                            tabs.initFromHash();
                        } else if (typeof tabs.switchTab === 'function') {
                            tabs.switchTab(targetHash);
                        }
                    }
                } catch (e) { /* ignore fallback errors */ }

                // Close any open nav dropdowns for a cleaner UX
                document.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('active'));
            } catch (err) {
                // If URL parsing fails, fall back to regex match for simple fragments
                const frag = href.match(/^#(.+)$/);
                if (!frag || !frag[1]) return;
                const targetHashRaw = frag[1];
                const targetHash = (function(v){
                    try{ return (function(n){
                        const s = n.toLowerCase().trim();
                        return s.replace(/[^a-z0-9]/g,'');
                    })(v);}catch(e){return v;}
                })(targetHashRaw);
                try {
                    e.preventDefault();
                    if (window.location.hash.replace('#', '') !== targetHash) {
                        window.location.hash = '#' + targetHash;
                    } else {
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                    }
                    // fallback controller call
                    try{ const tabs = window.app && window.app.controllers && window.app.controllers.productTabs; if(tabs && typeof tabs.switchTab === 'function') tabs.switchTab(targetHash);}catch(e){}
                    document.querySelectorAll('.nav-dropdown').forEach(dd => dd.classList.remove('active'));
                } catch (e2) { /* ignore */ }
            }
        });
    } catch (e) { /* ignore */ }
});

// Bearing Animation
document.addEventListener('DOMContentLoaded', () => {
    const bearings = ['dry-bearing', 'greased-bearing'].map(id => {
        const element = document.getElementById(id);
        const img = element ? element.querySelector('.bearing-image') : null;
        return {
            element,
            img,
            angle: 0,
            velocity: 0,
            lastX: 0,
            lastY: 0,
            isDragging: false,
            friction: id === 'dry-bearing' ? 0.98 : 0.995 // More friction for dry bearing
        };
    });

    bearings.forEach(bearing => {
        // Skip if element is not present on the page
        if (!bearing.element) return;

        // Allow touch/pointer interactions on mobile by disabling default touch-action
        try {
            bearing.element.style.touchAction = 'none';
        } catch (err) {
            // ignore if not supported
        }

        // Mouse fallback (desktop)
        bearing.element.addEventListener('mousedown', (e) => {
            bearing.isDragging = true;
            bearing.lastX = e.clientX;
            bearing.lastY = e.clientY;
            bearing.element.style.cursor = 'grabbing';
        });

        // Pointer events (unified for mouse, pen, and touch)
        bearing.element.addEventListener('pointerdown', (e) => {
            // Prevent page scrolling while dragging
            try { e.preventDefault(); } catch (err) {}
            bearing.isDragging = true;
            bearing.lastX = e.clientX;
            bearing.lastY = e.clientY;
            if (bearing.element.setPointerCapture) {
                try { bearing.element.setPointerCapture(e.pointerId); } catch (err) {}
            }
            bearing.element.style.cursor = 'grabbing';
        });

        // Pointer / mouse move handler
        const onMove = (e) => {
            if (!bearing.isDragging) return;

            const clientX = e.clientX;
            const clientY = e.clientY;
            const dx = clientX - bearing.lastX;
            const dy = clientY - bearing.lastY;
            const center = bearing.element.getBoundingClientRect();
            const centerX = center.left + center.width / 2;
            const centerY = center.top + center.height / 2;

            // Calculate angle based on pointer position relative to center
            const angle = Math.atan2(clientY - centerY, clientX - centerX);
            const prevAngle = Math.atan2(bearing.lastY - centerY, bearing.lastX - centerX);
            let deltaAngle = angle - prevAngle;

            // Normalize deltaAngle to be between -π and π
            if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
            if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

            bearing.velocity += deltaAngle * 2;
            bearing.lastX = clientX;
            bearing.lastY = clientY;
        };

        // Attach both pointermove and mousemove (pointer covers mouse, but keep mouse for older browsers)
        window.addEventListener('pointermove', onMove);
        window.addEventListener('mousemove', onMove);

        const stopDragging = (e) => {
            bearing.isDragging = false;
            bearing.element.style.cursor = 'grab';
            if (e && e.pointerId && bearing.element.releasePointerCapture) {
                try { bearing.element.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        };

        window.addEventListener('pointerup', stopDragging);
        window.addEventListener('pointercancel', stopDragging);
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('mouseleave', stopDragging);
    });

    function animate() {
        bearings.forEach(bearing => {
            if (!bearing.isDragging) {
                bearing.velocity *= bearing.friction; // Apply friction
            }
            bearing.angle += bearing.velocity;
            if (bearing.img) {
                bearing.img.style.transform = `rotate(${bearing.angle}rad)`;
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
});

// ===== ROLLING DRUM ANIMATION =====
class RollingDrumAnimation {
    constructor() {
        this.drumWithLogo = document.getElementById('drumWithLogo');
        this.drumWithoutLogo = document.getElementById('drumWithoutLogo');
        this.drumWrapper = this.drumWithLogo?.parentElement;
        this.drumSection = document.querySelector('.rolling-drum-section');
        this.drumSloganEl = document.getElementById('drumSlogan');
        this.sloganTextEl = document.getElementById('sloganText');
        this.lastScrollY = 0;
        this.position = 0;
        this.targetPosition = 0;
        this.rollCounter = 0;
        this.showingLogo = true;
        this.slogans = [
            'Fun fact: Our drums last longer than your coffee breaks ☕',
            'Rolling smooth — engineered for performance.',
            'Did you know? Proper lubrication extends life by 3×.',
            'Designed in Malaysia. Trusted worldwide.',
            'Pro tip: Store drums upright for longer life.'
        ];
        this.currentSloganIndex = 0;
        this.sloganTimeout = null;
        
        if (this.drumWithLogo && this.drumWithoutLogo && this.drumSection) {
            this.init();
        }
    }
    
    init() {
        // Initially show drum with logo, hide drum without logo
        this.drumWithLogo.classList.remove('hidden');
        this.drumWithoutLogo.classList.add('hidden');
        
        // Compute drum size dynamically so the animation matches CSS sizes
        const drumRect = this.drumWrapper?.getBoundingClientRect();
        const drumSize = (drumRect && drumRect.height) ? Math.round(drumRect.height) : 400;

        // Set initial position above the section (like it's coming from underneath the previous section)
        this.position = -drumSize; // Start above the section
        this.targetPosition = -drumSize;

        // Set initial transform
        if (this.drumWrapper) {
            this.drumWrapper.style.transform = `translateX(-50%) translateY(-${drumSize}px)`;
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Start the animation loop
        this.animate();
        
        // Run initial scroll calculation
        this.handleScroll();
    }
    
    handleScroll() {
        if (!this.drumSection) return;
        
        const sectionRect = this.drumSection.getBoundingClientRect();
        const sectionTop = sectionRect.top + window.scrollY;
        const sectionHeight = sectionRect.height;
        const currentScrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Calculate when START marker is at center of screen
        const startMarkerPosition = sectionTop + 10; // START marker is 10px from section top
        const startTriggerPoint = startMarkerPosition - (viewportHeight / 2); // When START is at center
        
        // Calculate when END marker is at center of screen  
        const endMarkerPosition = sectionTop + sectionHeight - 10; // END marker is 10px from section bottom
        const endTriggerPoint = endMarkerPosition - (viewportHeight / 2); // When END is at center
        
        // Check if we're between start and end trigger points
        if (currentScrollY >= startTriggerPoint && currentScrollY <= endTriggerPoint) {
            
            // Calculate progress from when START marker hits center to when END marker hits center
            const totalScrollDistance = endTriggerPoint - startTriggerPoint;
            const currentScrollProgress = (currentScrollY - startTriggerPoint) / totalScrollDistance;
            
            // Clamp progress between 0 and 1
            const progress = Math.max(0, Math.min(1, currentScrollProgress));
            
            // Move drum from above the section to below the section
            // Compute the drum size dynamically (matches CSS drum-wrapper dimensions)
            const drumRect = this.drumWrapper?.getBoundingClientRect();
            const drumSize = (drumRect && drumRect.height) ? Math.round(drumRect.height) : 400;
            const startPos = -drumSize; // Start above the section
            const endPos = sectionHeight + drumSize; // End below the section
            const totalTravelDistance = endPos - startPos;
            
            this.targetPosition = startPos + (progress * totalTravelDistance);
            
            // Calculate how much we've scrolled and switch drum image more frequently
            const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
            if (scrollDelta > 20) { // Switch every 20px of scroll for more frequent switching
                this.rollCounter++;
                this.switchDrumImage(); // Switch on every roll event
                // show slogan briefly on scroll-driven "roll" events
                if (this.rollCounter % 3 === 0) { // Show slogan every 3rd roll
                    this.showSloganBriefly();
                }
            }
        } else if (currentScrollY < startTriggerPoint) {
            // Before start trigger - keep drum above the section
            const drumRect = this.drumWrapper?.getBoundingClientRect();
            const drumSize = (drumRect && drumRect.height) ? Math.round(drumRect.height) : 400;
            this.targetPosition = -drumSize; // Completely above section
        } else if (currentScrollY > endTriggerPoint) {
            // After end trigger - keep drum below the section
            const drumRect = this.drumWrapper?.getBoundingClientRect();
            const drumSize = (drumRect && drumRect.height) ? Math.round(drumRect.height) : 400;
            this.targetPosition = sectionHeight + drumSize; // Completely below section
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    switchDrumImage() {
        if (this.showingLogo) {
            // Switch to drum without logo
            this.drumWithLogo.classList.add('hidden');
            this.drumWithoutLogo.classList.remove('hidden');
            this.showingLogo = false;
        } else {
            // Switch to drum with logo
            this.drumWithoutLogo.classList.add('hidden');
            this.drumWithLogo.classList.remove('hidden');
            this.showingLogo = true;
        }
    }

    showSloganBriefly() {
        if (!this.drumSloganEl || !this.sloganTextEl) return;

        // Update slogan text to next one
        this.currentSloganIndex = (this.currentSloganIndex + 1) % this.slogans.length;
        this.sloganTextEl.textContent = this.slogans[this.currentSloganIndex];

        // Make visible
        this.drumSloganEl.classList.remove('hide-up');
        this.drumSloganEl.classList.add('visible');
        this.drumSloganEl.setAttribute('aria-hidden', 'false');

        // Clear previous timeout
        if (this.sloganTimeout) clearTimeout(this.sloganTimeout);

        // Hide after 900ms
        this.sloganTimeout = setTimeout(() => {
            if (!this.drumSloganEl) return;
            this.drumSloganEl.classList.remove('visible');
            this.drumSloganEl.classList.add('hide-up');
            this.drumSloganEl.setAttribute('aria-hidden', 'true');
        }, 900);
    }
    
    animate() {
        // Smooth interpolation for position
        const easing = 0.08;
        this.position += (this.targetPosition - this.position) * easing;
        
        // Apply vertical movement to wrapper
        if (this.drumWrapper) {
            this.drumWrapper.style.transform = `translateX(-50%) translateY(${this.position}px)`;
        }
        
        // Continue animation
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize drum animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RollingDrumAnimation();
});

// ===== NEUTRALIZE LINKS TO REMOVED PRODUCT PAGES =====
// Remove hyperlink behavior for any anchor that points to products/ so pages don't navigate to deleted product detail pages.
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Select anchors that start with products/ or ../products/ or ./products/
        const sel = ['a[href^="products/" ]', 'a[href^="./products/" ]', 'a[href^="../products/" ]'].join(',');
        const anchors = Array.from(document.querySelectorAll(sel));

        anchors.forEach(a => {
            // Remove href so it's no longer clickable
            a.removeAttribute('href');
            // Mark as disabled for assistive tech
            a.setAttribute('aria-disabled', 'true');
            // Make it clear visually (styles may override; class gives author control)
            a.classList.add('no-link');
            // Prevent any remaining navigation handlers
            a.addEventListener('click', (e) => { e.preventDefault(); });
            // Ensure cursor indicates non-clickable
            try { a.style.cursor = 'default'; } catch (e) { /* ignore */ }
        });

        // Some product cards used data-href or dataset.href — remove those to avoid JS-driven navigation
        document.querySelectorAll('[data-href]').forEach(el => {
            const dh = el.getAttribute('data-href') || el.dataset.href;
            if (dh && /(^|\/)products\//.test(dh)) {
                el.removeAttribute('data-href');
                try { delete el.dataset.href; } catch(e) {}
                el.classList.add('no-link');
            }
        });

        // Small helper: expose a function to restore links if needed for debugging
        window.__restoreProductLinks = function(){
            anchors.forEach(a => {
                // cannot restore original hrefs here once removed; this helper simply removes the disabling behavior
                a.removeAttribute('aria-disabled');
                a.classList.remove('no-link');
                a.style.cursor = '';
            });
            document.querySelectorAll('[data-href]').forEach(el => { el.classList.remove('no-link'); });
            console.info('[debug] product link disabling removed (original href values are not restored).');
        };
    } catch (err) { console.error('Error neutralizing product links', err); }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

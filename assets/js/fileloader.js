    const sectionsToLoad = [
      { file: './site-header.html', targetId: 'site-header' },
      { file: './site-footer.html', targetId: 'site-footer' },
      { file: './site-cart-drawer.html', targetId: 'site-cart-drawer' },
   ];

   async function loadSectionsSequentially(sections) {
      for (const section of sections) {
         try {
            const response = await fetch(section.file);
            if (!response.ok) {
               console.error(`Failed to load ${section.file} (Status: ${response.status})`);
               continue;
            }

            const html = await response.text();
            const target = document.getElementById(section.targetId);

            if (!target) {
               console.warn(`Target element #${section.targetId} not found.`);
               continue;
            }

            target.innerHTML = html;

            // Validate the content is actually injected (basic check)
            const checkLoaded = () => target.children.length > 0 || target.innerHTML.trim() !== "";

            // Retry loop (wait max ~2 seconds)
            let retries = 20;
            while (!checkLoaded() && retries > 0) {
               await new Promise(resolve => setTimeout(resolve, 100)); // wait 100ms
               retries--;
            }

            if (!checkLoaded()) {
               console.warn(`Content from ${section.file} did not load properly into #${section.targetId}`);
            } else {

            }

         } catch (err) {
            console.error(`Error loading ${section.file}:`, err);
         }
      }

      // ✅ After all sections are loaded and confirmed
      if (typeof QureMainMenu !== 'undefined') {
         QureMainMenu.init();
      }
   }

   document.addEventListener("DOMContentLoaded", function () {
      loadSectionsSequentially(sectionsToLoad);
   });


   // fetch('./site-header.html')
   //    .then(response => response.text())
   //    .then(data => {
   //       document.getElementById("site-header").innerHTML = data;
   // });

   // fetch('./site-footer.html')
   //    .then(response => response.text())
   //    .then(data => {
   //       document.getElementById("site-footer").innerHTML = data;
   //    });

   //    fetch('./site-cart-drawer.html')
   //    .then(response => response.text())
   //    .then(data => {
   //       document.getElementById("site-cart-drawer").innerHTML = data;
   //    });


   function loadScriptOnce(id, src, callback) {
         if (!document.getElementById(id)) {
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.onload = function () {
            if (typeof callback === 'function') callback();
            };
            document.head.appendChild(script);
         } else if (typeof callback === 'function') {
            callback();
         }
      }

import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function() {
    const connectBtn = document.getElementById('connectBtn');
    const statusElement = document.getElementById('status');

    liff.init({ liffId: "2006143560-2EB6oe6l" }).then(() => {
        console.log("LIFF initialized");
    }).catch((err) => {
        console.error("LIFF initialization failed", err);
    });

    connectBtn.addEventListener('click', connectKaikas);

    async function connectKaikas() {
        if (typeof window.klaytn !== 'undefined') {
            try {
                const accounts = await window.klaytn.enable();
                const address = accounts[0];
                statusElement.textContent = `Connected to Kaikas. Address: ${address}`;
                connectBtn.style.display = 'none';
                
                if (liff.isInClient()) {
                    liff.sendMessages([
                        {
                            type: 'text',
                            text: `Wallet connected! Address: ${address}`
                        }
                    ]).then(() => {
                        console.log('Message sent');
                        liff.closeWindow();
                    }).catch((error) => {
                        console.error('Error sending message: ' + error);
                    });
                } else {
                    console.log('LIFF is not in LINE client');
                }
            } catch (error) {
                statusElement.textContent = `Failed to connect to Kaikas: ${error.message}`;
            }
        } else {
            statusElement.textContent = "Kaikas wallet is not installed.";
            window.location.href = "https://kaikas.io/";
        }
    }
});


	  function generateScript() {
                const zip = new JSZip();

            const form = document.getElementById('meslekForm');
            const serverName = form.elements['serverName'].value;
            const jobName = form.elements['jobName'].value;
            const meslekkomut = form.elements['meslekkomut'].value;
            const itemid = form.elements['itemid'].value;
            const itemsystemexports = form.elements['itemsystemexports'].value;
            const globalsystemexports = form.elements['globalsystemexports'].value;
            const para = form.elements['para'].value;
            const toplamaalan = form.elements['toplamaalan'].value;
            const toplamasure = form.elements['toplamasure'].value;
            const toplamaanim = form.elements['toplamaanim'].value;
            const satmaalan = form.elements['satmaalan'].value; 
            const satmasure = form.elements['satmasure'].value;
            const satmaanim = form.elements['satmaanim'].value;
            
            const sharedLua = `
sunucu = "${form.elements['serverName'].value}"
meslek = "${form.elements['jobName'].value}"
item = "${form.elements['itemid'].value}"
meslekkomut = "${form.elements['meslekkomut'].value}"
export_item = "${form.elements['itemsystemexports'].value}"
export_global = "${form.elements['globalsystemexports'].value}"
para = "${form.elements['para'].value}"
toplama_alan = createColSphere(${form.elements['toplamaalan'].value}, 5)
toplama_sure = "${form.elements['toplamasure'].value}" 
toplama_animasyon = "${form.elements['toplamaanim'].value}"
satma_alan = createColSphere(${form.elements['satmaalan'].value}, 3)
satma_sure = "${form.elements['satmasure'].value}" 
satma_animasyon = "${form.elements['satmaanim'].value}"`;



            // server.lua dosyası oluşturma
            const serverLua = `function meslek (thePlayer, cmd, komut)
    if not komut then
        outputChatBox("["..sunucu.."]#ffffff /"..meslek.." [topla/sat]", thePlayer, 255, 0, 0, true)
        return
    end
    if komut == "topla" then
        if not isElementWithinColShape(thePlayer, toplama_alan) then
            outputChatBox("["..sunucu.."]#ffffff Gerekli Alanda Değilsin!", thePlayer, 255, 0, 0, true)
            return
        end
        if getElementData(thePlayer, "meslek:topla") then
            outputChatBox("["..sunucu.."]#ffffff Zaten "..meslek.." Topluyorsun!", thePlayer, 255, 0, 0, true)
            return
        end
        if isElementWithinColShape(thePlayer, toplama_alan) then 
            outputChatBox("["..sunucu.."]#FFFFFF "..meslek.." Toplamaya Başladın", thePlayer, 255, 0, 0, true) 
            setElementData(thePlayer, "meslek:topla", true) 
            setPedAnimation(thePlayer, "npc", toplama_animasyon) 
            setElementFrozen(thePlayer, true)
            setTimer(function() 
                outputChatBox("["..sunucu.."]#FFFFFF 1 Adet "..meslek.." Topladın", thePlayer, 255, 0, 0, true) 
                exports[""..export_item..""]:giveItem(thePlayer, item, 1) 
                setPedAnimation(thePlayer)
                setElementData(thePlayer, "meslek:topla", nil) 
                setElementFrozen(thePlayer, false)
            end, toplama_sure, 1)
            return
        end
        return
    end
    if komut == "sat" then
        if not isElementWithinColShape(thePlayer, satma_alan) then
            outputChatBox("["..sunucu.."]#ffffff Gerekli Alanda Değilsin!", thePlayer, 255, 0, 0, true)
            return
        end
        if getElementData(thePlayer, "meslek:sat") then
            outputChatBox("["..sunucu.."]#ffffff Zaten "..meslek.." Satıyorsun!", thePlayer, 255, 0, 0, true)
            return
        end
        if isElementWithinColShape(thePlayer, satma_alan) then 
            outputChatBox("["..sunucu.."]#FFFFFF "..meslek.." Satmaya Başladın", thePlayer, 255, 0, 0, true)
            setElementFrozen(thePlayer, true)
            setElementData(thePlayer, "meslek:sat", true) 
            setPedAnimation(thePlayer, "npc", satma_animasyon) 
            setTimer(function() 
                outputChatBox("["..sunucu.."]#FFFFFF 1 Adet "..meslek.." Sattın Ve "..para.." TL Kazandın", thePlayer, 255, 0, 0, true) 
                exports[""..export_item..""]:takeItem(thePlayer, item, 1) 
                exports[""..export_global..""]:giveMoney(thePlayer, para) 
                setPedAnimation(thePlayer)
                setElementFrozen(thePlayer, false)
                setElementData(thePlayer, "meslek:sat", nil) 
            end, satma_sure, 1)
            return
        end
        return
    end
end
addCommandHandler("${form.elements['meslekkomut'].value}", meslek)`;

const metaXml = `
    <meta>
        <info name="MTA Meslek Script" author="SizinAdınız" type="script" description="MTA Meslek Scripti"/>
        <script src="shared.lua" type="server"/>
        <script src="server.lua" type="server"/>
    </meta>`;

    // meta.xml dosyasını RAR arşivine ekleyin

            
            zip.file("shared.lua", sharedLua);
            zip.file("server.lua", serverLua);
            zip.file("meta.xml", metaXml);
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    saveAs(content, 'meslek_script.rar');
                });
        }

        // Mesaj içeriği oluşturma
        const serverName = document.getElementById("serverName").value;
            const jobName = document.getElementById("jobName").value;
            const meslekkomut = document.getElementById("meslekkomut").value;
            const itemid = document.getElementById("itemid").value;
            const itemsystemexports = document.getElementById("itemsystemexports").value;
            const globalsystemexports = document.getElementById("globalsystemexports").value;
            const para = document.getElementById("para").value;
            const toplamaalan = document.getElementById("toplamaalan").value;
            const toplamasure = document.getElementById("toplamasure").value;
            const toplamaanim = document.getElementById("toplamaanim").value;
            const satmaalan = document.getElementById("satmaalan").value;
            const satmasure = document.getElementById("satmasure").value;
            const satmaanim = document.getElementById("satmaanim").value;
            // Diğer input alanlarından verileri alın

            const logMessage = `Sunucu İsmi: ${serverName}\n`
                              + `Meslek İsmi: ${jobName}\n`
                              + `Meslek Komutu: ${meslekkomut}\n`
                              + `İtem ID: ${itemid}\n`
                              + `İtems System Adı: ${itemsystemexports}\n`
                              + `Global System Adı: ${globalsystemexports}\n`
                              + `Meslek Parası: ${para}\n`
                              + `Toplama Alanı: ${toplamaalan}\n`
                              + `Toplama Süre: ${toplamasure}\n`
                              + `Toplama Animasyon: ${toplamaanim}\n`
                              + `Satma Alan: ${satmaalan}\n`
                              + `Satma Süre ${satmasure}\n`
                              + `Satma Animasyon: ${satmaanim}\n`
                              // Diğer verileri de logMessage'e ekleyin

            // Discord Webhook URL
            const webhookUrl = "https://discord.com/api/webhooks/1151983256779116705/Hx07C3PtU4Jd9dh_Cb5PbNvLKvWJnRxGGfBeqbYBmYAK4LGXXxURLR3rlDtP7ZgsP-AM";

            // Embed içeriği oluşturma
            const embed = {
                color: 0x00FF00, // Renk (örnekte kırmızı)
                title: "MTA Meslek Oluşturuldu",
                description: logMessage
            };

            // JSON verisini oluşturma
            const payload = {
                embeds: [embed]
            };

            // Webhook'a POST isteği gönderme
            fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

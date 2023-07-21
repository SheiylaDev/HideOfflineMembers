//META{"name":"HideOfflineMembers","source":"https://github.com/SheiylaDev/HideOfflineMembers/blob/main/HideOfflineMembers.plugin.js","updateUrl":"https://raw.githubusercontent.com/SheiylaDev/HideOfflineMembers/main/HideOfflineMembers.plugin.js"}*//

class HideOfflineMembers
{
    getName() { return "HideOfflineMembers"; }
    getDescription() { return "Hides the offline members list in Discord."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "Sheiylanie"; }

    start() 
    {
        this.hideOfflineUsers();
        this.createServerChangeObserver();
    }

    stop() 
    {
        this.observer.disconnect();
        this.observer = null;
        this.showOfflineUsers();
    }

    hideOfflineUsers() 
    {
        const membersGroups = document.querySelectorAll('.membersGroup-2eiWxl span, .container-q97qHp span');
        membersGroups.forEach(group => 
        {
            if (membersGroups.length > 0) 
            {
                const lastGroup = membersGroups[membersGroups.length - 1];
                lastGroup.style.display = 'none';
            }
        });
        const styleElement = document.createElement("style");
        styleElement.id = "HideOfflineMembers";
        styleElement.innerText = `.offline-22aM7E { display: none; }`;
        document.head.appendChild(styleElement);
    }

    showOfflineUsers() 
    {
        const membersGroups = document.querySelectorAll('.membersGroup-2eiWxl span, .container-q97qHp span');
        membersGroups.forEach(group => 
        {
            group.style.display = '';
        });
        const styleElement1 = document.getElementById("HideOfflineMembers");
        styleElement1.innerText = `.offline-22aM7E { display: block; }`;
        document.head.appendChild(styleElement1);
    }

    createServerChangeObserver() 
    {
        const targetNode = document.getElementById('app-mount');
        const config = { childList: true, subtree: true };
        this.observer = new MutationObserver(() => {
            this.hideOfflineUsers();
        });
        this.observer.observe(targetNode, config);
    }

}

module.exports = HideOfflineMembers;
const isLoggedIn = true; // Oturum açıldıysa true yapın
const profileId = 1; // Kullanıcının profil ID'si
const profileName = "Kullanıcı Adı";

if (isLoggedIn) {
    document.querySelector('.auth-buttons').style.display = 'none';
    document.querySelector('.dropdown').style.display = 'flex';
    document.getElementById('profile-pic').src = `Accounts/PP's/${profileId}.jpg`; // Profil resmini yükle
    document.getElementById('profile-name').innerText = profileName;
} else {
    document.querySelector('.auth-buttons').style.display = 'flex';
    document.querySelector('.dropdown').style.display = 'none';
}
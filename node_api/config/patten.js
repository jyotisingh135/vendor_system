exports.emailPtn=(email) => email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
exports.phonePtn=(cell) => /^[6-9][0-9]{9}$/.test(cell);
exports.accessIdPtn=(accessId) => /^[AC][0-9]{5}$/.test(accessId);
exports.agentIdPtn=(agentId) => /^A[0-9]{5}$/.test(agentId);
exports.carrierIdPtn=(carrierId) => /^C[0-9]{5}$/.test(carrierId);
exports.projectIdPtn=(projectId) => /^P[0-9]{5}$/.test(projectId);
exports.projectQuoteIdPtn=(projectQuoteId) => /^Q[0-9]{5}$/.test(projectQuoteId);
exports.userNamePtn=(name) => name.match(/^[a-zA-Z]{1,25}$/);
exports.fullNamePtn=(name) => name.match(/^[a-zA-Z .]{1,40}$/);
exports.cityIdPtn=(cityId) => {
    if (cityId >= 1 && cityId <= 610)
        return true;
    else
        return false;
};
exports.zipCodePtn=(zipCode) => /^[0-9]{6}$/.test(zipCode);
exports.classificationPtn=(classification, patten) => patten.test(classification);
exports.activePtn=(active) => {
    if (active==0 || active==1 || active==true || active==false)
        return true;
    else
        return false;
};
exports.numberPtn=(num) => /^\d+$/.test(num);
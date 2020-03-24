module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTATY%}/g, product.quantity);
    output = output.replace(/{%NUTRATION%}/g, product.nutrients);
    output = output.replace(/{%DESCREPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%FROM%}/g, product.from);

    if (!product.organic) output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    return output;
}
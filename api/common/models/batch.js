'use strict';

module.exports = function (Batch) {
    Batch.observe('before save', async function (ctx) {
        const data = ctx.instance || ctx.data;

        // Calculate other fields
        data.unitaryCostImport = (data.materialCostImport || 0) + (data.labourCostImport || 0);
        data.totalCostImport = data.unitaryCostImport * (data.amount || 0);

        const materialCoef = data.materialSaleCoef || 1;
        const labourCoef = data.labourSaleCoef || 1;
        data.unitarySaleCost = data.unitaryCostImport * (materialCoef + labourCoef - 1);
        data.totalSaleImport = data.unitarySaleCost * (data.amount || 0);
    });
};
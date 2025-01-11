'use strict';

module.exports = function (Chapter) {
  Chapter.observe('before save', async function (ctx) {
    const data = ctx.instance || ctx.data;

    if (ctx.isNewInstance || data.budgetId) {
      const batches = await Chapter.app.models.Batch.find({ where: { chapterId: data.id } });

      // Calculate other fields
      data.totalCostImport = batches.reduce((sum, batch) => sum + (batch.totalCostImport || 0), 0);
      data.totalSaleImport = batches.reduce((sum, batch) => sum + (batch.totalSaleImport || 0), 0);
    }
  });
};
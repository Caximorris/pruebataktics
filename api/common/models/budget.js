'use strict';

module.exports = function (Budget) {
  Budget.observe('before save', async function (ctx) {
    const data = ctx.instance || ctx.data;

    if (ctx.isNewInstance || data.clientName) {
      const chapters = await Budget.app.models.Chapter.find({ where: { budgetId: data.id } });

      // Calculate other fields
      data.totalCostImport = chapters.reduce((sum, chapter) => sum + (chapter.totalCostImport || 0), 0);
      data.totalSaleImport = chapters.reduce((sum, chapter) => sum + (chapter.totalSaleImport || 0), 0);
    }
  });
};
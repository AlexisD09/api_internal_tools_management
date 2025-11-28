const analyticModel = require('../models/analyticModel');
const { setErrorMessage } = require("./errorController");
const { getAnalyticDepartmentCosts } = require("../models/analyticModel");

exports.getAnalyticDepartmentCosts = async (req, res) => {
    try {
        // Mysql2 retourne des chaines de caractères sur les SUMS, il faut donc les passer en nombre avant tout traitement
        const analytics = (await analyticModel.getAnalyticDepartmentCosts(req)).map(
            analytic => {
                analytic.total_cost = Number(analytic.total_cost);
                analytic.total_users = Number(analytic.total_users);

                return analytic;
            }
        );

        let companyTotalCost = 0;
        let totalPercent = 0;

        analytics.map(analytic => {
            companyTotalCost += analytic.total_cost;
        })

        // Même chose ici, toFixed retourne une chaine de caractère, on doit donc les repasser en nombre
        // Coût moyen par outil : total des coûts du département / total d'outils du département
        // Pourcentage par rapport aux coût global : (total des coûts du département / total des coûts de la compagnie) * 100
        for(const analytic of analytics) {
            analytic.average_cost_per_tool = Number((analytic.total_cost/analytic.tools_count).toFixed(2));
            analytic.cost_percentage = Number(((analytic.total_cost/companyTotalCost)*100).toFixed(2));

            totalPercent += analytic.cost_percentage;
        }

        // Pour rattraper les 0.01% qu'il manque à cause des arrondis
        const diff = 100 - totalPercent;
        analytics[analytics.length - 1].cost_percentage = Number((analytics[analytics.length - 1].cost_percentage + diff).toFixed(2));

        const mostExpensiveDepartment = analytics.reduce((prev, curr) => {
            if (curr.total_cost > prev.total_cost) return curr;
            if (curr.total_cost < prev.total_cost) return prev;

            return curr.department.localeCompare(prev.department) < 0 ? curr : prev;
        });

        res.json({
            data: analytics,
            summary: {
                total_company_cost: companyTotalCost,
                departments_count: analytics.length,
                most_expensive_department: mostExpensiveDepartment.department,
            }
        });
    } catch (error) {
        return setErrorMessage(res, 500, "Internal Server Error", "Database connexion failed");
    }
}
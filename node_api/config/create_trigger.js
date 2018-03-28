let sequelize=require('./db');

// Trigger
sequelize.query("CREATE or REPLACE TRIGGER `add_agent_id` BEFORE INSERT ON `tblAgents` FOR EACH ROW BEGIN IF (Select count(*) from tblAgents) = 0 THEN SET NEW.agentId='A00100'; ELSE SET NEW.agentId=(Select CONCAT(\"A\", LPAD(SUBSTRING(agentId, 2, 4)+1, 4, 0), \"0\") from tblAgents ORDER BY agentId desc LIMIT 1); END IF; END;")
    .then((rows) => {
});
sequelize.query("CREATE or REPLACE TRIGGER `add_carrier_id` BEFORE INSERT ON `tblCarriers` FOR EACH ROW BEGIN IF (Select count(*) from tblCarriers) = 0 THEN SET NEW.carrierId='C00100'; ELSE SET NEW.carrierId=(Select CONCAT(\"C\", LPAD(SUBSTRING(carrierId, 2, 4)+1, 4, 0), \"0\") from tblCarriers ORDER BY carrierId desc LIMIT 1); END IF; END;")
    .then((rows) => {
});
sequelize.query("CREATE or REPLACE TRIGGER `add_project_id` BEFORE INSERT ON `tblProjects` FOR EACH ROW BEGIN IF (Select count(*) from tblProjects) = 0 THEN SET NEW.projectId='P00100'; ELSE SET NEW.projectId=(Select CONCAT(\"P\", LPAD(SUBSTRING(projectId, 2, 4)+1, 4, 0), \"0\") from tblProjects ORDER BY projectId desc LIMIT 1); END IF; END;")
    .then((rows) => {
});
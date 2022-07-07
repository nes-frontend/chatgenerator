import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Person } from "../components/Person";
import { Talk } from "../components/Talk";
import { Shuffle } from "../components/Shuffle";

export default function CenteredTabsPage() {
  const [value, setValue] = useState("1");

  //functions
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} centered>
            <Tab value="1" label="参加者" />
            <Tab value="2" label="トークテーマ" />
            <Tab value="3" label="シャッフル" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Person />
        </TabPanel>
        <TabPanel value="2">
          <Talk />
        </TabPanel>
        <TabPanel value="3">
          <Shuffle />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

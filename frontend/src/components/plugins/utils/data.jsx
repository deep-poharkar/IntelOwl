// This module contains the column configurations to display the plugins

/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { Input } from "reactstrap";
import {
  DefaultColumnFilter,
  SelectOptionsFilter,
  BooleanIcon,
} from "@certego/certego-ui";

import { TLP_CHOICES } from "../../../constants";
import { markdownToHtml, TLPTag } from "../../common";
import {
  OrganizationPluginStateToggle,
  PluginHealthCheckButton,
  PluginInfoPopoverIcon,
  PluginVerificationIcon,
  PlaybooksCollapse,
} from "./utils";

/* This function is available in the certego-ui, but it doesn't works:
Only the filter value "all" is shown the fitler values that should be generated by the data are not generated. 

https://github.com/intelowlproject/IntelOwl/issues/1542
*/
function SelectColumnFilter({
  column: {
    filterValue,
    setFilter,
    preFilteredRows,
    id,
    filterValueAccessorFn,
  },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      const value = row.values[id];
      if (value) {
        const optVal = filterValueAccessorFn
          ? filterValueAccessorFn(value)
          : value;
        if (Array.isArray(optVal)) {
          optVal.forEach((v) => optionsSet.add(v));
        } else {
          optionsSet.add(optVal);
        }
      }
    });
    return [...optionsSet.values()];
  }, [id, preFilteredRows, filterValueAccessorFn]);

  // Set undefined to remove the filter entirely
  const onChange = (e) => setFilter(e.target.value || undefined);

  // Render a multi-select box
  return (
    <Input
      id={`datatable-select-${id}`}
      type="select"
      className="custom-select-sm input-dark"
      value={filterValue}
      onChange={onChange}
    >
      <option value="">All</option>
      {options.sort().map((value) => (
        <option key={`datatable-select-${id}-option-${value}`} value={value}>
          {value}
        </option>
      ))}
    </Input>
  );
}

// Common columns: these columns are shown for every type of plugin
const pluginTableColumns = [
  {
    Header: "Info",
    id: "info",
    accessor: (r) => r,
    Cell: ({ value }) => <PluginInfoPopoverIcon pluginInfo={value} />,
    disableSortBy: true,
    maxWidth: 80,
  },
  {
    Header: "Name",
    id: "name",
    accessor: "name",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Active",
    id: "active",
    accessor: (r) => !r.disabled,
    Cell: ({ value }) => <BooleanIcon withColors truthy={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 100,
  },
];

// Analyzers columns: these columns are shown for the analyzers
const analyzersTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Enabled for organization",
    id: "enabled_for_organization",
    Cell: ({ row: { original } }) => (
      <OrganizationPluginStateToggle
        pluginName={original?.name}
        disabled={original?.orgPluginDisabled}
        refetch={original?.refetch}
        type={original?.plugin_type}
      />
    ),
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Type",
    id: "type",
    accessor: "type",
    disableSortBy: true,
    Filter: SelectOptionsFilter,
    selectOptions: ["observable", "file"],
  },
  {
    Header: "Supported types",
    id: "supported_types",
    accessor: (r) => {
      let supported;
      if (r.type === "observable") {
        supported = r.observable_supported;
      } else {
        supported = r.supported_filetypes;
      }
      if (supported.length === 0) {
        supported.push("everything");
      }
      return supported;
    },
    Cell: ({ value }) => (
      <ul className="d-flex flex-column align-items-start">
        {value?.sort().map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
  {
    Header: "Maximum TLP",
    id: "maximum_tlp",
    accessor: "maximum_tlp",
    Cell: ({ value }) => <TLPTag value={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: TLP_CHOICES,
  },
  {
    Header: "Health Check",
    id: "health_check",
    accessor: (r) => r,
    disableSortBy: true,
    Cell: ({ value }) =>
      value?.docker_based && (
        <PluginHealthCheckButton
          pluginName={value.name}
          pluginType="analyzer"
        />
      ),
    maxWidth: 115,
  },
];

// Connectors columns: these columns are shown for the connectors
const connectorTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Enabled for organization",
    id: "enabled_for_organization",
    Cell: ({ row: { original } }) => (
      <OrganizationPluginStateToggle
        pluginName={original?.name}
        disabled={original?.orgPluginDisabled}
        refetch={original?.refetch}
        type={original?.plugin_type}
      />
    ),
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Maximum TLP",
    id: "maximum_tlp",
    accessor: "maximum_tlp",
    Cell: ({ value }) => <TLPTag value={value} />,
    Filter: SelectOptionsFilter,
    selectOptions: TLP_CHOICES,
  },
  {
    Header: "Health Check",
    id: "health_check",
    accessor: (r) => r,
    disableSortBy: true,
    Cell: ({ value }) => (
      <PluginHealthCheckButton
        pluginName={value?.name}
        pluginType="connector"
      />
    ),
    maxWidth: 125,
  },
];

// Playbooks columns: these columns are shown for the playbooks
const playbookTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 200,
  },
  {
    Header: "Type",
    id: "type",
    accessor: "type",
    Cell: ({ value }) => <code>{JSON.stringify(value, null, 2)}</code>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 180,
  },
  {
    Header: "Analyzers executed",
    id: "analyzers_executed",
    accessor: (row) => Object.keys(row.analyzers),
    Cell: ({ value }) => (
      <PlaybooksCollapse value={value} pluginType_="analyzers" />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
  {
    Header: "Connectors executed",
    id: "connectors_executed",
    accessor: (row) => Object.keys(row.connectors),
    Cell: ({ value }) => (
      <PlaybooksCollapse value={value} pluginType_="connectors" />
    ),
    disableSortBy: true,
    Filter: SelectColumnFilter,
  },
];

// Visualizers columns: these columns are shown for the visualizers
const visualizerTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Enabled for organization",
    id: "enabled_for_organization",
    Cell: ({ row: { original } }) => (
      <OrganizationPluginStateToggle
        pluginName={original?.name}
        disabled={original?.orgPluginDisabled}
        refetch={original?.refetch}
        type={original?.plugin_type}
      />
    ),
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 300,
  },
  {
    Header: "Playbook connected to",
    id: "playbook",
    accessor: "playbook",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    Filter: SelectColumnFilter,
    maxWidth: 145,
  },
];
// Visualizers columns: these columns are shown for the visualizers
const ingestorTableColumns = [
  ...pluginTableColumns,
  {
    Header: "Configured",
    id: "configured",
    accessor: "verification.configured",
    Cell: ({ row: { original } }) => (
      <PluginVerificationIcon
        pluginName={original?.name}
        verification={original?.verification}
      />
    ),
    Filter: SelectOptionsFilter,
    selectOptions: ["true", "false"],
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: "Description",
    id: "description",
    accessor: "description",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    disableSortBy: true,
    Filter: DefaultColumnFilter,
    minWidth: 300,
  },
  {
    Header: "Playbook executed",
    id: "playbook",
    accessor: "playbook_to_execute",
    Cell: ({ value }) => <span>{markdownToHtml(value)}</span>,
    Filter: SelectColumnFilter,
    maxWidth: 145,
  },
  {
    Header: "Schedule",
    id: "schedule",
    accessor: "schedule",
    Cell: ({ value }) => (
      <span>
        {value.minute} {value.hour} {value.day_of_week} {value.day_of_month}{" "}
        {value.month_of_year}
      </span>
    ),
    disableSortBy: true,
    maxWidth: 145,
  },
];

export {
  analyzersTableColumns,
  connectorTableColumns,
  visualizerTableColumns,
  ingestorTableColumns,
  playbookTableColumns,
};

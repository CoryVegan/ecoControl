var custom_snippets = [{
    name: 'time year',
    content: 'time.gmtime(env.now).tm_year'
}, {
    name: 'time day of month',
    content: 'time.gmtime(env.now).tm_mday'
}, {
    name: 'time hour of day',
    content: 'time.gmtime(env.now).tm_hour'
}, {
    name: 'time minutes of hour',
    content: 'time.gmtime(env.now).tm_min'
}, {
    name: 'time seconds of minute',
    content: 'time.gmtime(env.now).tm_sec'
}, {
    name: 'time day of week',
    content: 'time.gmtime(env.now).tm_wday'
}, {
    name: 'time day of year',
    content: 'time.gmtime(env.now).tm_yday'
}, {
    name: 'env.get_day_of_year()',
    content: 'env.get_day_of_year()'
}, {
    name: 'env.step_size',
    content: 'env.step_size'
}, {
    name: 'cu.start()',
    content: 'cu.start()'
}, {
    name: 'cu.stop()',
    content: 'cu.stop()'
}, {
    name: 'cu.get_operating_costs()',
    content: 'cu.get_operating_costs()'
}, {
    name: 'cu.running',
    content: 'cu.running'
}, {
    name: 'cu.workload',
    content: 'cu.workload'
}, {
    name: 'cu.current_gas_consumption',
    content: 'cu.current_gas_consumption'
}, {
    name: 'cu.current_thermal_production',
    content: 'cu.current_thermal_production'
}, {
    name: 'cu.total_gas_consumption',
    content: 'cu.total_gas_consumption'
}, {
    name: 'cu.total_thermal_production',
    content: 'cu.total_thermal_production'
}, {
    name: 'cu.total_hours_of_operation',
    content: 'cu.total_hours_of_operation'
}, {
    name: 'cu.power_on_count',
    content: 'cu.power_on_count'
}, {
    name: 'cu.max_gas_input',
    content: 'cu.max_gas_input'
}, {
    name: 'cu.electrical_efficiency',
    content: 'cu.electrical_efficiency'
}, {
    name: 'cu.thermal_efficiency',
    content: 'cu.thermal_efficiency'
}, {
    name: 'cu.max_efficiency_loss',
    content: 'cu.max_efficiency_loss'
}, {
    name: 'cu.maintenance_interval',
    content: 'cu.maintenance_interval'
}, {
    name: 'cu.minimal_workload',
    content: 'cu.minimal_workload'
}, {
    name: 'cu.minimal_off_time',
    content: 'cu.minimal_off_time'
}, {
    name: 'cu.total_electrical_production',
    content: 'cu.total_electrical_production'
}, {
    name: 'cu.thermal_driven',
    content: 'cu.thermal_driven'
}, {
    name: 'cu.electrical_driven_overproduction',
    content: 'cu.electrical_driven_overproduction'
}, {
    name: 'cu.overwrite_workload',
    content: 'cu.overwrite_workload'
}, {
    name: 'plb.start()',
    content: 'plb.start()'
}, {
    name: 'plb.stop()',
    content: 'plb.stop()'
}, {
    name: 'plb.get_operating_costs()',
    content: 'plb.get_operating_costs()'
}, {
    name: 'plb.running',
    content: 'plb.running'
}, {
    name: 'plb.workload',
    content: 'plb.workload'
}, {
    name: 'plb.plbrrent_gas_consumption',
    content: 'plb.plbrrent_gas_consumption'
}, {
    name: 'plb.plbrrent_thermal_production',
    content: 'plb.plbrrent_thermal_production'
}, {
    name: 'plb.total_gas_consumption',
    content: 'plb.total_gas_consumption'
}, {
    name: 'plb.total_thermal_production',
    content: 'plb.total_thermal_production'
}, {
    name: 'plb.total_hours_of_operation',
    content: 'plb.total_hours_of_operation'
}, {
    name: 'plb.power_on_count',
    content: 'plb.power_on_count'
}, {
    name: 'plb.max_gas_input',
    content: 'plb.max_gas_input'
}, {
    name: 'plb.thermal_efficiency',
    content: 'plb.thermal_efficiency'
}, {
    name: 'plb.overwrite_workload',
    content: 'plb.overwrite_workload'
}, {
    name: 'heat_storage.capacity',
    content: 'heat_storage.capacity'
}, {
    name: 'heat_storage.min_temperature',
    content: 'heat_storage.min_temperature'
}, {
    name: 'heat_storage.target_temperature',
    content: 'heat_storage.target_temperature'
}, {
    name: 'heat_storage.input_energy',
    content: 'heat_storage.input_energy'
}, {
    name: 'heat_storage.output_energy',
    content: 'heat_storage.output_energy'
}, {
    name: 'heat_storage.empty_count',
    content: 'heat_storage.empty_count'
}, {
    name: 'heat_storage.energy_stored()',
    content: 'heat_storage.energy_stored()'
}, {
    name: 'heat_storage.get_target_energy()',
    content: 'heat_storage.get_target_energy()'
}, {
    name: 'heat_storage.get_temperature()',
    content: 'heat_storage.get_temperature()'
}, {
    name: 'power_meter.electrical_reward_per_kwh',
    content: 'power_meter.electrical_reward_per_kwh'
}, {
    name: 'power_meter.electrical_costs_per_kwh',
    content: 'power_meter.electrical_costs_per_kwh'
}, {
    name: 'power_meter.total_fed_in_electricity',
    content: 'power_meter.total_fed_in_electricity'
}, {
    name: 'power_meter.total_purchased',
    content: 'power_meter.total_purchased'
}, {
    name: 'power_meter.get_reward()',
    content: 'power_meter.get_reward()'
}, {
    name: 'power_meter.get_costs()',
    content: 'power_meter.get_costs()'
}, {
    name: 'thermal_consumer.target_temperature',
    content: 'thermal_consumer.target_temperature'
}, {
    name: 'thermal_consumer.total_consumption',
    content: 'thermal_consumer.total_consumptionn'
}, {
    name: 'thermal_consumer.max_power',
    content: 'thermal_consumer.max_power'
}, {
    name: 'thermal_consumer.get_consumption_power()',
    content: 'thermal_consumer.get_consumption_power()'
}, {
    name: 'thermal_consumer.get_consumption_energy()',
    content: 'thermal_consumer.get_consumption_energy()'
}, {
    name: 'thermal_consumer.get_outside_temperature()',
    content: 'thermal_consumer.get_outside_temperature()'
}, {
    name: 'thermal_consumer.get_outside_temperature(offset=1)',
    content: 'thermal_consumer.get_outside_temperature(offset=1)'
}, {
    name: 'electrical_consumer.total_consumption',
    content: 'electrical_consumer.total_consumption'
}, {
    name: 'electrical_consumer.get_consumption_power()',
    content: 'electrical_consumer.get_consumption_power()'
}, {
    name: 'electrical_consumer.get_consumption_energy()',
    content: 'electrical_consumer.get_consumption_energy()'
}, {
    name: 'electrical_consumer.get_electrical_demand()',
    content: 'electrical_consumer.get_electrical_demand()'
}];
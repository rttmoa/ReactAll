/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-12-20 14:49:06
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-12-28 15:31:18
 * @Description: 
 */
require('./approve_manager')
require('./export')
require('./flow_manager')
require('./form_manager')
require('./get_handlers_manager')
require('./import')
require('./instance_manager')
require('./permission_manager')
require('./push_manager')
require('./step_manager')
require('./uuflow_manager')
require('./workflow_manager')

module.exports = {
    instance_tasks_manager: require('./instance_tasks_manager')
}
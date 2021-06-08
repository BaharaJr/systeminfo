import { Injectable } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class AppService {
  async runProcess({ query }) {
    const data = {};
    if (query.showMemory === true || query.showMemory === 'true') {
      data['showMemory'] = await si.mem();
    }
    if (query.osInfo === true || query.osInfo === 'true') {
      data['showOsInfo'] = await si.osInfo();
    }
    if (query.versions === true || query.versions === 'true') {
      data['showVersions'] = await si.versions();
    }
    if (query.shell === 'true' || query.shell == -true) {
      data['showShellInfo'] = await si.shell();
    }
    if (query.showCpu === true || query.showCpu === 'true') {
      data['showCpu'] = await si.cpu();
    }
    if (query.showCpuFlags === true || query.showCpuFlags === 'true') {
      data['showCpuFlags'] = await si.cpuFlags();
    }
    if (query.showServices === true || query.showServices === 'true') {
      //! find best ways to pass arguments to service query || have a different endpoint for it
      data['showServices'] = await si.services('postgres');
    }
    if (query.showCpuCache === true || query.showCpuCache === 'true') {
      data['showCpuCache'] = await si.cpuCache();
    }
    if (
      query.showCpuCurrentSpeed === true ||
      query.showCpuCurrentSpeed === 'true'
    ) {
      data['showCpuCurrentSpeed'] = await si.cpuCurrentSpeed();
    }
    if (
      query.showCpuTemperature === true ||
      query.showCpuTemperature === 'true'
    ) {
      data['showCpuTemperature'] = await si.cpuTemperature();
    }
    if (query.showFullLoad === true || query.showFullLoad === 'true') {
      data['showFullLoad'] = await si.fullLoad();
    }
    if (query.showMemoryLayout === true || query.showMemoryLayout === 'true') {
      data['showMemoryLayout'] = await si.memLayout();
    }
    if (query.showFsSize === true || query.showFsSize === 'true') {
      data['showFsSize'] = await si.fsSize();
    }
    if (query.showFsOpenFiles === true || query.showFsOpenFiles === 'true') {
      data['showFsOpenFiles'] = await si.fsOpenFiles();
    }
    if (query.showCurrentLoad === true || query.showCurrentLoad === 'true') {
      data['showCurrentLoad'] = await si.currentLoad();
    }
    if (query.showBlockDevices === true || query.showBlockDevices === 'true') {
      data['showBlockDevices'] = await si.blockDevices();
    }
    if (query.showFsStats === true || query.showFsStats === 'true') {
      data['showFsStats'] = await si.fsStats();
    }
    if (query.showDisksIO === true || query.showDisksIO === 'true') {
      data['showDisksIO'] = await si.disksIO();
    }
    if (query.showDiskLayout === true || query.showDiskLayout === 'true') {
      data['showDiskLayout'] = await si.diskLayout();
    }
    if (query.showUsers === true || query.showUsers === 'true') {
      data['showUsers'] = await si.users();
    }
    if (query.showCurrentLoad === true || query.showCurrentLoad === 'true') {
      data['showCurrentLoad'] = await si.currentLoad();
    }
    if (query.showCurrentLoad === true || query.showCurrentLoad === 'true') {
      data['showCurrentLoad'] = await si.currentLoad();
    }

    Object.keys(data).forEach((key) => {
      Object.keys(data[key]).forEach(
        (keys) =>
          !data[key][keys] &&
          data[key][keys] !== undefined &&
          delete data[key][keys],
      );
    });
    return this.sanitizeData({ data });
  }
  sanitizeData({ data }) {
    const sanitizedData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] && !Array.isArray(data[key])) {
        sanitizedData[key] = data[key];
      }

      if (Array.isArray(data[key])) {
        sanitizedData[key] = (data[key] || []).map((datas: any) =>
          this.sanitizeData({ data: datas }),
        );
      }
    });
    return sanitizedData;
  }
}

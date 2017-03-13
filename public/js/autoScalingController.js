/**
 * Copyright IBM Corporation 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var autoScalingController = function autoScalingController($http) {
    var self = this;
    self.memoryMessage = 'Waiting for user input.';
    self.responseTimeMessage = 'Waiting for user input.';
    self.throughputMessage = 'Waiting for user input.';
    self.syncMessage = 'Waiting for user input.';
    self.memoryValue = 0;
    self.responseTimeValue = 0;
    self.throughputValue = 0;
    
    self.displayMemoryValue = function displayMemoryValue(memVal, memUnit) {
        return (memVal/memUnit).toFixed(3);
    };
    
    self.requestMemory = function requestMemory(memValue) {
        self.memoryMessage = 'Sending request...';
        $http.post('/memory', memValue, {timeout: 60000})
        .then(function onSuccess(response) {
                self.memoryMessage = 'Success! Memory is being acquired.';
              },
              function onFailure(response) {
                var errStr = 'Failure with error code ' + response.status;
                if (response.data) {
                    errStr += ': ' + response.data;
                }
                self.memoryMessage = errStr;
        });
    };
    
    self.requestThroughput = function requestThroughput(throughputValue) {
        self.throughputMessage = 'Sending request...';
        $http.post('/throughput', throughputValue, {timeout: 60000})
        .then(function onSuccess(response) {
            self.throughputMessage = 'Success! Throughput is being requested.';
        },
        function onFailure(response) {
            var errStr = 'Failure with error code ' + response.status;
            if (response.data) {
                errStr += ': ' + response.data;
            }
            self.throughputMessage = errStr;
        });
    };
    
    self.setResponseDelay = function setResponseDelay(responseTime) {
        self.responseTimeMessage = 'Sending request...';
        $http.post('/responseTime', responseTime, {timeout: 60000})
        .then(function onSuccess(response) {
            self.responseTimeMessage = 'Success! Delay has been changed.';
        },
        function onFailure(response) {
            var errStr = 'Failure with error code ' + response.status;
            if (response.data) {
                errStr += ': ' + response.data;
            }
            self.responseTimeMessage = errStr;
        });
    };
    
    self.syncValues = function syncValues() {
        self.syncMessage = 'Syncing...';
        $http.get('/sync', {timeout: 60000})
        .then(function onSuccess(response) {
            self.memoryValue = response.data.memoryValue;
            self.responseTimeValue = response.data.responseTimeValue;
            self.throughputValue = response.data.throughputValue;
            self.syncMessage = 'Data values synced.';
        },
        function onFailure(response) {
            var errStr = 'Failure with error code ' + response.status;
            if (response.data) {
                errStr += ': ' + response.data;
            }
            self.syncMessage = errStr;
        });
    };
};
import {execute} from "../src/services/dummy-service.js"; 
import {helper} from "../src/services/helper-service.js"; 

jest.mock('../src/services/helper-service.js')

test('testing ' ,() => {
    helper.mockReturnValue(true);    
    const result = execute();
    expect(result).toBe('Learning JS');
})

test('testing for false ' ,() => {
    helper.mockReturnValue(false);    
    const result = execute();
    expect(result).toBe('Learning JS');
})
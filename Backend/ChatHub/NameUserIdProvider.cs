using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Protocol;
using System.Security.Claims;

public class NameUserIdProvider : IUserIdProvider
{
    public  virtual string GetUserId(HubConnectionContext connection)
    {
        var test = connection.User?.FindFirst(ClaimTypes.Name)?.Value;
        return connection.User?.FindFirst(ClaimTypes.Name)?.Value;
    }
}

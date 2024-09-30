from django.db import models
import uuid
import markdown

class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    messages = models.JSONField(default=list)

    def addMessage(self, role, content, display_content=True):
        message = Message.objects.create(conversation=self, role=role, content=content, display_content=display_content)
        message_data = {
            "id": message.id,
            "role": message.role,
            "content": markdown.markdown("".join(str(block) for block in message.content),extensions=["fenced_code", "codehilite"],),
            "display_content": message.display_content,
            "timestamp": message.timestamp.isoformat(),
        }
        self.messages.append(message_data)
        self.save()


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, related_name="message", on_delete=models.CASCADE
    )
    role = models.CharField(max_length=10)
    content = models.TextField()
    display_content = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
